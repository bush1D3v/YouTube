# Análise de Engenharia Reversa — Pomatez v1.11.0

> **Objeto analisado:** código-fonte do Pomatez 1.11.0 em `pomatez-1.11.0/` (release de 2026-05-19).
> **Observação:** o app **não está instalado** como binário nesta máquina (não há snap, deb, rpm, AppImage, flatpak, executável no PATH nem `~/.config/pomatez`). Por isso a análise foi feita **estaticamente, sobre o código-fonte**, sem executar o app.

---

## 1. Visão geral

Pomatez é um timer **Pomodoro para desktop** (Windows, macOS e Linux), open source (MIT), com lista de tarefas embutida. A janela padrão tem 340×502 px, então é pensado como um widget pequeno que fica ao lado do trabalho.

O app tem **dois "cascos" nativos** que carregam **a mesma UI em React**:

```
                ┌──────────────────────────────┐
                │   app/renderer (React SPA)   │  ← UI, regras do timer, tarefas
                └──────────────┬───────────────┘
                               │  ConnectorContext (abstração)
              ┌────────────────┴────────────────┐
   ElectronConnector                      TauriConnector
   (IPC via preload/contextBridge)        (invoke() de comandos Rust)
              │                                 │
   app/electron (Node/TS)              app/tauri (Rust, Tauri 2)
   build oficial / principal           build alternativo, mais leve
```

- `app/shareables` — constantes compartilhadas (nomes dos canais IPC, links).
- `website/` — site de divulgação (Gatsby), separado do app.

---

## 2. Stack

### 2.1 Monorepo e tooling
| Item | Tecnologia |
|---|---|
| Gerência do monorepo | **Lerna 7** (versionamento independente) + **Yarn workspaces** (`app/*`) |
| Linguagem | **TypeScript 4.9** (front e Electron), **Rust 2021 / ≥1.77** (Tauri) |
| Bundling | `react-scripts 5` (Create React App) no renderer, `tsc` + **esbuild** no preload do Electron, **Rollup** no `shareables` |
| Qualidade | Prettier 2.7, Husky + lint-staged, Commitizen (conventional commits) |
| Release | **release-please** + GitHub Actions (`build.yml`, `build-tauri.yml`, `codeql-analysis.yml`, `release-please.yml`, `website-deploy.yml`) |
| Testes | Jest (+ `@jest-runner/electron`) — **só 1 arquivo de teste** (`fullScreenBreak.test.ts`) |

### 2.2 Frontend — `app/renderer`
| Camada | Tecnologia |
|---|---|
| UI | **React 16.14** (componentes funcionais + hooks) |
| Roteamento | **react-router-dom 5** (rotas: Timer, Tasks, Config, Settings) |
| Estado | **Redux Toolkit 2** + react-redux 7; **redux-undo** para desfazer/refazer nas tarefas |
| Estilo | **styled-components 5** (temas claro/escuro em `styles/themes.ts`) |
| i18n | **i18next 25 / react-i18next 16** — idiomas: `en`, `es`, `zh`, `ja` (+ "auto") |
| Extras | `react-beautiful-dnd` (arrastar tarefas/listas), `react-markdown` (descrição de tarefa em Markdown), `autosize`, `use-stay-awake` (Wake Lock) |
| Áudio | WAVs pré-gerados (sino + voz). Voz gerada offline por `tts-generator.js` com a lib `say` |
| Persistência | `localStorage` (chave `"state"`, gravação com debounce de 1 s) |

### 2.3 Casco Electron — `app/electron` (build principal)
| Item | Tecnologia |
|---|---|
| Runtime | **Electron 34.5.8** |
| Empacotamento | **electron-builder 25** — Win (NSIS + portable), macOS (dmg, notarização via `@electron/notarize`), Linux (AppImage, deb, rpm, snap) |
| Auto-update | **electron-updater 6** (GitHub Releases) |
| Config nativa | **electron-store 8** (tema, titlebar, compact mode, abrir no login) |
| Notificações | `node-notifier` (updates) e Web Notifications API (timer) |
| Integrações | **discord-rpc** (Discord Rich Presence) |
| Segurança | `contextIsolation: true`, preload com **whitelist de canais** (`TO_MAIN`/`FROM_MAIN`), links externos abertos no navegador |

### 2.4 Casco Tauri — `app/tauri` (build alternativo)
| Item | Tecnologia |
|---|---|
| Runtime | **Tauri 2** (Rust + WebView do sistema) |
| Plugins | `autostart`, `shell`, `notification`, `global-shortcut`, `updater` |
| HTTP | `reqwest` (consulta à API de releases do GitHub para update) |
| Bundles | deb, AppImage, msi, nsis, dmg |

### 2.5 Website — `website/`
Gatsby + TypeScript + styled-components, deploy via GitHub Actions.

---

## 3. Funcionalidades

### 3.1 Timer Pomodoro
- Ciclo **Foco → Pausa curta → … → Pausa longa** (4 tipos: `STAY_FOCUS`, `SHORT_BREAK`, `LONG_BREAK`, `SPECIAL_BREAK`).
- Padrões: **25 min foco / 5 min pausa curta / 15 min pausa longa / 4 rodadas** (`store/config/defaultConfig.ts`), todos ajustáveis por slider.
- Controles: play/pause, reset, **pular** etapa, mute, alternar modo compacto.
- Contagem baseada em `Date.now()` (delta real), o que **compensa o throttling** de timers quando a janela está em segundo plano.
- **Auto-iniciar foco** após a pausa (opcional).
- Impede o computador de dormir durante as pausas (Wake Lock).

### 3.2 Pausas especiais
Até **4 pausas em horário fixo** (ex.: almoço), cada uma com hora de início e duração. Quando o relógio bate o horário e o timer está rodando, o app entra numa pausa especial automaticamente.

### 3.3 Lista de tarefas
- Várias **listas**, cada uma com **cartões** (texto + descrição em **Markdown** + concluído/não concluído).
- Arrastar e soltar listas e cartões.
- **Desfazer/refazer** (Ctrl+Z / Ctrl+Shift+Z).
- Uma lista pode ser marcada como **prioritária**: o primeiro cartão pendente dela aparece na tela do Timer ("PriorityCard"), com ações de concluir, pular ou remover.

### 3.4 Notificações e áudio
- Tipos: **Nenhuma** (padrão), **Normal** (a cada transição) e **Extra** (também 60 s antes do fim da pausa e 30 s antes do fim do foco).
- Sino padronizado em todos os SOs; **assistência por voz** opcional (voz masculina, inglês).

### 3.5 Janela e sistema
- **Pausa em tela cheia**: ocupa a tela durante a pausa, fica por cima de tudo e bloqueia Esc/Ctrl+W.
- **Modo estrito**: com o timer rodando, bloqueia pausar, resetar e pular (mostra aviso).
- **Sempre no topo**, **modo compacto** (340×100), **titlebar nativa ou customizada**.
- **Minimizar/fechar para a bandeja**; ícone da bandeja vira um **anel de progresso** (SVG → canvas 16×16 → PNG) enquanto o timer roda.
- Confirmação ao sair pela bandeja se houver sessão em andamento.
- **Abrir ao iniciar o sistema** (escondido no Linux).
- Instância única (focar a janela existente ao abrir de novo).
- **Atalhos globais**: `Alt+Shift+H` (esconder) e `Alt+Shift+S` (mostrar). Local: `Alt+Shift+T` (alternar tema).
- **Tema escuro** manual ou **seguindo o sistema**.
- **Discord Rich Presence** (mostra "Staying focused" / "Taking a break" com contagem).
- **Auto-update** em segundo plano com notificação.
- **Idioma** selecionável (auto, en, es, zh, ja).

### 3.6 Privacidade / rede
Não há conta, backend próprio nem telemetria no código. As únicas saídas de rede encontradas são:
1. checagem de atualização no **GitHub Releases**;
2. **Discord RPC**, que é IPC local com o cliente do Discord (só se o Discord estiver aberto).

---

## 4. Limitações

### 4.1 Funcionais (de produto)
1. **Sem estatísticas/histórico**: não registra quantos pomodoros foram feitos, por dia ou por tarefa. As tarefas não ficam vinculadas a tempo gasto.
2. **Estado do timer não é persistido**: só `config`, `settings` e `tasks` vão para o `localStorage`. Fechar o app perde a rodada e o tempo restante.
3. **Sem sincronização**: dados ficam no `localStorage` de uma máquina, sem nuvem, exportação ou importação.
4. **Atalhos não customizáveis** (o próprio README admite; há `TODO` em `components/Shortcut.tsx`).
5. **Pausa em tela cheia não suporta múltiplos monitores** (admitido no README).
6. **Pausas especiais frágeis**: só disparam se o timer estiver **rodando** exatamente no minuto `HH:MM` de início. O campo `toTime` é salvo mas **não é usado** na lógica (`contexts/CounterContext.tsx`).
7. **Idiomas limitados**: não tem **pt-BR**. Além disso, os textos das **notificações estão fixos em inglês** no `CounterContext.tsx` (não passam pelo i18n), e a voz é só em inglês.
8. **Sem sons customizáveis** nem volume ajustável (só ligado/desligado).
9. **"Abrir no login" fica oculto no Linux.**
10. Modo estrito e tela cheia **podem ser contornados**: o usuário pode desligar a opção em Settings ou matar o processo. Não há trava real.

### 4.2 Bugs encontrados na análise estática
| # | Onde | Problema | Efeito provável |
|---|---|---|---|
| B1 | `app/electron/src/main.ts` (handler `SET_ENABLE_RPC`) | Lê e grava a chave **`openAtLogin`** em vez de uma chave própria de RPC | Ligar/desligar o Discord RPC **corrompe a preferência "abrir no login"** no electron-store, e a comparação de "mudou?" usa o valor errado |
| B2 | `app/electron/src/lifecycleEventHandlers/fullScreenBreak.ts` (`setFullScreen`) | `isFullscreen = flag` altera só o **parâmetro local**, não `windowState.isFullscreen` | O main process nunca sabe que está em tela cheia, então os checks "não esconder na bandeja durante a pausa" em `minimize`/`close` **não funcionam** |
| B3 | `app/tauri/src/commands.rs` | `set_ui_theme` e `show_window` são **no-op** (tem um `TODO` admitindo) | No Tauri, o tema não é passado ao nativo e "mostrar janela" não faz nada |
| B4 | `app/tauri/Cargo.toml` / `tauri.conf.json` | Versão **1.10.0** enquanto o resto está em 1.11.0 | Depende de um script (`cargo-version-updater.js`) rodar antes do build para não sair com a versão errada |

### 4.3 Técnicas / arquiteturais
1. **Stack defasada no front**: React 16, react-router 5, styled-components 5 e **Create React App (`react-scripts`)**, que está descontinuado. TypeScript 4.9.
2. **Dois backends com paridade incompleta**: Discord RPC e o fluxo de update via `node-notifier` só existem no Electron, e há comandos vazios no Tauri. Toda feature nativa precisa ser feita duas vezes.
3. **Electron pesado** para um timer (Chromium + Node embarcados, ~100 MB+). O Tauri resolve isso, mas é o build secundário.
4. **Lógica de negócio dentro de um componente React**: toda a máquina de estados do timer está em `CounterContext.tsx` (~450 linhas de `useEffect`, com código repetido para cada pausa especial). Difícil de testar e de manter.
5. **Cobertura de testes quase nula**: 1 arquivo de teste no projeto inteiro.
6. **Main process lê o estado via `executeJavaScript("localStorage.getItem(...)")`** e chama `window.isUserHaveSession()` exposto globalmente. Isso acopla o main ao DOM/estado do renderer.
7. **Atalhos globais "sequestrados"**: durante a pausa em tela cheia, `Esc` e `Ctrl+W` são registrados **globalmente** como no-op, e em produção `Ctrl+R`, `Ctrl+Shift+R`, `Ctrl+Alt+Q` e `F11` são bloqueados enquanto a janela tem foco.
8. **Snap antigo**: `snapcraft.yaml` usa `base: core18` e `nodejs-version: 12.18.1`, ambos fora de suporte.
9. **Tauri com `csp: null`**: sem Content Security Policy na WebView.
10. **`Date.now()` + checagem de horário por string `HH:MM`** em intervalo de 500 ms: mudanças de fuso ou relógio do sistema afetam o timer e as pausas especiais.

---

## 5. Mapa rápido de arquivos-chave

| Assunto | Arquivo |
|---|---|
| Entrada do Electron (janela, bandeja, IPC, update) | `app/electron/src/main.ts` |
| Ponte segura renderer ↔ main | `app/electron/src/preload.ts` |
| Canais IPC e links | `app/shareables/src/index.ts` |
| Entrada do Tauri | `app/tauri/src/lib.rs`, `commands.rs` |
| Máquina de estados do timer | `app/renderer/src/contexts/CounterContext.tsx` |
| Abstração Electron/Tauri | `app/renderer/src/contexts/connectors/*.tsx` |
| Store Redux + persistência | `app/renderer/src/store/store.ts` |
| Padrões de config/settings | `app/renderer/src/store/config/defaultConfig.ts`, `store/settings/defaultSettings.ts` |
| Lista de toggles da tela Settings | `app/renderer/src/routes/Settings/FeatureSection.tsx` |
| Modo estrito | `app/renderer/src/routes/Timer/Control/Control.tsx` |
| Ícone de progresso na bandeja | `app/renderer/src/hooks/useTrayIconUpdates.tsx` |
