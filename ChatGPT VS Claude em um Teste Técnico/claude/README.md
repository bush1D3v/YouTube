# Finance — Controle Financeiro Pessoal

> Aplicação full-stack para controle de receitas e despesas, com saldo em tempo real, filtros, persistência em banco de dados e UI responsiva e acessível.

[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/) [![Express](https://img.shields.io/badge/Express-4-lightgrey)](https://expressjs.com/) [![Prisma](https://img.shields.io/badge/Prisma-SQLite-2D3748)](https://www.prisma.io/) [![Tests](https://img.shields.io/badge/tests-Vitest-6E9F18)](https://vitest.dev/)

---

## Sumário

- [Visão geral](#visão-geral)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [API — Contrato](#api--contrato)
- [Padrões aplicados](#padrões-aplicados)
- [Boas práticas seguidas](#boas-práticas-seguidas)
- [Decisões técnicas e por quê](#decisões-técnicas-e-por-quê)
- [Acessibilidade & UX](#acessibilidade--ux)
- [Performance](#performance)
- [Segurança](#segurança)
- [Testes](#testes)
- [O que torna o projeto pronto para produção](#o-que-torna-o-projeto-pronto-para-produção)
- [Critérios de um site bem-sucedido neste segmento](#critérios-de-um-site-bem-sucedido-neste-segmento)
- [Roadmap](#roadmap)

---

## Visão geral

Aplicação web onde o usuário cadastra **receitas** e **despesas**, acompanha **saldo, total de receitas e total de despesas**, busca por título, filtra por tipo e categoria, e remove transações.

Funcionalidades:

- Listagem ordenada por data (mais recente primeiro).
- Cadastro com validação ponta a ponta (front + back).
- Resumo financeiro com cards de Receita / Despesa / Saldo.
- Busca por título + filtros por tipo e categoria.
- Persistência em **SQLite** via **Prisma** (volátil em dev, volume Docker em prod).
- Tratamento centralizado de erros com envelope JSON consistente.
- Testes unitários e de integração no back-end e testes de componente no front-end.
- Containerização com **Docker Compose** (`docker compose up` e pronto).
- UI responsiva (mobile-first), acessível (WCAG AA-friendly) e com foco visível.

---

## Stack

| Camada | Tecnologias |
| --- | --- |
| Front-end | Next.js 14 (App Router), React 18, TypeScript, TailwindCSS, TanStack Query, React Hook Form, Zod |
| Back-end | Node.js 20, Express, TypeScript, Prisma, SQLite, Zod, Helmet, CORS, Morgan |
| Testes | Vitest, Supertest, React Testing Library, jsdom |
| DevOps | Docker multi-stage, Docker Compose, healthchecks |

---

## Arquitetura

### Visão geral

```
┌──────────────────────────┐         HTTP/JSON          ┌──────────────────────────┐
│        Next.js Web       │  ───────────────────────▶  │        Express API       │
│  (App Router + RHF + RQ) │                            │  (Layered, DI-friendly)  │
└──────────────────────────┘                            └──────────┬───────────────┘
                                                                   │ Prisma Client
                                                                   ▼
                                                        ┌──────────────────────────┐
                                                        │    SQLite (file-based)   │
                                                        └──────────────────────────┘
```

### Back-end — arquitetura em camadas

```
HTTP request
    │
    ▼
[ Routes ]  → declara rotas e plugga middlewares
    │
    ▼
[ Middleware: validate(Zod) ]  → valida e tipa body/query/params
    │
    ▼
[ Controller ]  → orquestra request/response, sem regra de negócio
    │
    ▼
[ Service ]  → regras de negócio, normalização, invariantes
    │
    ▼
[ Repository (interface) ]  → abstrai o acesso a dados
    │
    ▼
[ Prisma + SQLite ]
```

A separação **routes → controller → service → repository** garante:

- **Testabilidade**: cada camada é testada isoladamente; usamos um repositório in-memory nos testes para HTTP/integration sem tocar no disco.
- **Substituibilidade**: trocar SQLite por Postgres é mudar `provider` no `schema.prisma`; trocar Prisma por outro ORM é implementar a interface `ITransactionRepository`.
- **Clareza**: cada arquivo tem uma responsabilidade.

### Front-end — organização

```
src/
├── app/                # App Router (layout, página, providers, CSS global)
├── components/         # UI desacoplada (apresentação)
├── hooks/              # Hooks de domínio (useTransactions, useSummary…)
├── services/           # API client + serviço de transações
├── lib/                # Utilitários puros (format, validation)
└── types/              # Tipos do domínio (espelham o contrato da API)
```

Princípios:

- **Separation of Concerns**: componentes apresentacionais não chamam `fetch`; usam hooks.
- **Server state vs UI state**: server state vive em React Query; estado de UI (modal, filtros) em `useState` local.
- **Schema único de validação**: Zod descreve o formulário no front e o body no back.

---

## Estrutura do repositório

```
.
├── server/                 # API Express + Prisma + SQLite
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── app.ts
│   │   ├── index.ts
│   │   ├── config/         # env + prisma client
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middlewares/    # validate, error handler
│   │   ├── schemas/        # Zod schemas (DTOs)
│   │   ├── domain/         # tipos de domínio
│   │   ├── errors/         # HttpError
│   │   └── __tests__/
│   ├── Dockerfile
│   └── package.json
│
├── web/                    # Front-end Next.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   ├── types/
│   │   └── __tests__/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── docs/TEST_BRIEF.md      # Briefing original preservado
└── README.md
```

---

## Como rodar

> **Pré-requisitos:** Node.js 18+ e npm. (Opcional: Docker para o caminho “1 comando”.)

### Opção 1 — Docker Compose (recomendado)

```bash
docker compose up --build
```

- Front-end: <http://localhost:3000>
- API: <http://localhost:3333>
- Healthcheck: <http://localhost:3333/health>

### Opção 2 — Local

**Back-end (porta 3333):**

```bash
cd server
cp .env.example .env
npm install
npx prisma migrate deploy
npm run dev
```

**Front-end (porta 3000), em outro terminal:**

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Acesse <http://localhost:3000>.

### Build de produção

```bash
# Back-end
cd server && npm run build && npm start

# Front-end
cd web && npm run build && npm start
```

---

## Variáveis de ambiente

### `server/.env`

| Variável | Default | Descrição |
| --- | --- | --- |
| `NODE_ENV` | `development` | Ambiente. |
| `PORT` | `3333` | Porta HTTP. |
| `DATABASE_URL` | `file:./dev.db` | URL do banco (SQLite via Prisma). |
| `CORS_ORIGIN` | `http://localhost:3000` | Origem permitida pelo CORS. |

### `web/.env.local`

| Variável | Default | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3333` | Base URL da API. |

Validação de env é feita com Zod no boot (`server/src/config/env.ts`); a API falha rápido se algo estiver inválido.

---

## API — Contrato

Todas as respostas seguem o envelope `{ "data": ... }` para sucesso e `{ "error": { code, message, details? } }` para erro.

### `GET /transactions`

Query params (todos opcionais):

- `type`: `INCOME` | `EXPENSE`
- `category`: string (match exato)
- `search`: string (match parcial em `title`)

Resposta `200`:

```json
{
  "data": [
    {
      "id": "8c1c…",
      "title": "Salário",
      "amount": 5000,
      "type": "INCOME",
      "category": "salário",
      "createdAt": "2026-04-28T10:00:00.000Z"
    }
  ]
}
```

### `POST /transactions`

Body:

```json
{ "title": "Mercado", "amount": 250.5, "type": "EXPENSE", "category": "alimentação" }
```

- `amount` é **sempre positivo**; o tipo (`INCOME`/`EXPENSE`) determina o sinal nos cálculos. Decisão deliberada para evitar ambiguidade e classes de bugs com sinais.
- Resposta `201`: `{ "data": <transaction> }`.
- Erros de validação retornam `400` com `error.details` apontando o campo.

### `DELETE /transactions/:id`

- `id` precisa ser UUID. Resposta `204` sem corpo. `404` se não existir.

### `GET /summary`

```json
{ "data": { "income": 5000, "expense": 250.5, "balance": 4749.5, "count": 2 } }
```

### `GET /health`

```json
{ "status": "ok", "timestamp": "..." }
```

### Formato de erro

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Validation failed",
    "details": [{ "path": "amount", "message": "amount must be greater than zero" }]
  }
}
```

---

## Padrões aplicados

- **Layered Architecture** (routes → controller → service → repository).
- **Repository Pattern** com interface (`ITransactionRepository`) — facilita troca de persistência e mocking.
- **Dependency Injection (manual / por construtor)** — `TransactionService` recebe o repositório; rotas aceitam um controller injetado para testes.
- **Factory Pattern** — `createApp()` retorna uma instância configurada do Express.
- **DTO + Validation Schema** — Zod como fonte única de verdade para validação e tipos derivados (`z.infer`).
- **Centralized Error Handling** — classe `HttpError` + middleware único produzindo um envelope de erro padronizado.
- **Adapter Pattern (front)** — `apiFetch` adapta `fetch` para o formato do domínio (envelope, erros tipados).
- **Custom Hooks** — encapsulam server state com React Query (`useTransactions`, `useSummary`, etc.).
- **Container/Presentational** — `page.tsx` orquestra; `components/*` são apresentacionais.
- **Schema-driven Forms** — React Hook Form + Zod + `@hookform/resolvers`.
- **Multi-stage Docker builds** — imagens menores, sem dev-deps.

---

## Boas práticas seguidas

**TypeScript & Qualidade**

- `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.
- Sem `any` espalhado: tipos saem do schema (Zod) e do domínio.
- Nomes claros e consistentes (PascalCase para tipos/classes, camelCase para funções).

**API**

- Envelope de resposta consistente.
- Códigos de status HTTP corretos (200/201/204/400/404/500).
- Validação **na borda** com Zod; controllers só recebem dados válidos.
- Logs estruturados via Morgan; PrismaClient único e reaproveitado.
- Shutdown gracioso (`SIGINT`/`SIGTERM` desconecta o Prisma).

**Front-end**

- App Router + Server-by-default; `'use client'` só onde necessário.
- React Query com `staleTime` e invalidação seletiva — UI consistente sem flicker.
- Formulários com `react-hook-form` (uncontrolled, performático) + Zod.
- Mensagens de erro vindas da API mapeadas no formulário (`setError`).

**UI/UX**

- Mobile-first com TailwindCSS, breakpoints `sm/md`.
- Estados explícitos: loading (skeletons), empty, error, success.
- Confirmação antes de excluir.
- Botão de “Pular para o conteúdo” (skip link).
- Foco visível e respeito a `prefers-reduced-motion`.

---

## Decisões técnicas e por quê

| Decisão | Por quê |
| --- | --- |
| **Prisma + SQLite** em vez de array em memória | O brief permite, mas SQLite + Prisma adiciona persistência real, migrations versionadas, e troca trivial para Postgres em produção. Sem custo de setup. |
| **`amount` sempre positivo + `type` separado** | Evita bugs com sinais, simplifica filtros (`WHERE type = 'EXPENSE'`) e deixa o contrato explícito. |
| **Zod nos dois lados** | Mesma fonte de verdade para validação, mesmas mensagens, e tipos derivados (`z.infer`) eliminam duplicação. |
| **TanStack Query** em vez de `useEffect + fetch` | Cache, dedup, invalidação, loading/error state e refetch ficam triviais. Reduz drasticamente bugs de sincronização. |
| **App Router (Next 14)** | Padrão atual do Next.js, server-first, melhor split de bundle, melhor a11y default. |
| **Tailwind** em vez de CSS-in-JS | Zero runtime, classes utilitárias revisáveis no diff de PR, ótimo para responsividade. |
| **Repositório com interface** | Permite trocar Prisma/SQLite e habilita testes HTTP rápidos sem banco. |
| **Migrations versionadas** | A migration inicial é commitada — `prisma migrate deploy` funciona idempotente em CI/Docker. |
| **Helmet + CORS configurável + `x-powered-by` desabilitado** | Defesa em profundidade; cabeçalhos sensatos por padrão. |
| **Headers de segurança no Next** | `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. |
| **Multi-stage Dockerfiles** | Imagens menores, sem dev-deps, build reproduzível. |
| **Healthcheck no compose** | O front só sobe depois que a API está saudável — onboarding não falha por race condition. |

---

## Acessibilidade & UX

- Marcação semântica (`<main>`, `<header>`, `<section>`, `<article>`, `<time>`).
- `aria-label`, `aria-describedby`, `aria-invalid`, `aria-busy` onde fazem sentido.
- Modal acessível: `role="dialog"`, `aria-modal`, fechamento por `Esc`, retorno de foco e clique no backdrop.
- Skip link "Pular para o conteúdo".
- Foco visível com `:focus-visible`.
- Respeito a `prefers-reduced-motion`.
- Contraste alto nos cards e botões.
- Inputs com `inputmode="decimal"` no campo de valor (mobile UX).
- `<datalist>` para sugerir categorias sem travar a entrada livre.

---

## Performance

- **Bundle**: Next.js 14 com tree-shaking; sem libs de UI pesadas.
- **Server state cache** (TanStack Query) com `staleTime` evita refetches desnecessários.
- **Invalidação seletiva** apenas das queries afetadas após mutations.
- **PrismaClient singleton** evita esgotamento de conexões em dev.
- **Índices** no SQLite em `type`, `category` e `createdAt` para filtros e ordenação.
- **`cache: 'no-store'`** apenas onde necessário (dados financeiros do usuário não devem ser cacheados em CDN).
- **Imagens otimizadas** prontas via `next/image` (não usadas por escolha minimalista).
- **Skeletons** evitam CLS perceptível.

---

## Segurança

- **Helmet** com defaults (CSP, X-DNS-Prefetch-Control, etc.).
- **CORS** restrito a `CORS_ORIGIN`; nada de `*` em produção.
- **`x-powered-by` desativado**; menos sinal pra atacante.
- **Limite de payload** no `express.json` (`100kb`).
- **Validação estrita** de todos os inputs com Zod (defesa contra mass assignment, injeção de campos não esperados, tipos inválidos).
- **UUID validado** em params para evitar varreduras.
- **Prisma** com queries parametrizadas — sem SQL injection.
- **Headers de segurança** no Next (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, etc.).
- **Sem segredos em código**; tudo via env.
- **Erros sanitizados**: stack traces nunca chegam ao cliente.
- **`.env` ignorado pelo Git** e `.env.example` documentado.

> Próximos passos para produção: rate limiting (`express-rate-limit`), CSP estrita no Next, autenticação (NextAuth/Auth.js), refresh tokens, audit log, criptografia em repouso para dados sensíveis.

---

## Testes

### Back-end (Vitest + Supertest)

```bash
cd server
npm test
npm run test:coverage
```

Cobertura:

- **Service**: regras de negócio (normalização, summary, 404 ao deletar inexistente).
- **Routes (HTTP)**: validação de body e params, fluxo completo create→list→summary→delete, filtros.

### Front-end (Vitest + Testing Library)

```bash
cd web
npm test
```

Cobertura:

- Schema de validação do formulário (Zod).
- Helpers de formatação.
- Componente `<TransactionForm />` (validação visual e submit).

---

## O que torna o projeto pronto para produção

- Persistência real com migrations versionadas.
- Validação rigorosa em **toda** entrada do sistema.
- Erros padronizados, sem leak de stack trace.
- Healthcheck para orquestradores (Docker/K8s).
- Shutdown gracioso (preserva conexões em deploy).
- Build reproduzível com Docker multi-stage.
- Variáveis de ambiente validadas no boot.
- Cabeçalhos de segurança aplicados.
- Estrutura preparada para crescer (DI, interfaces, layers).
- Testes automatizados nas duas pontas.
- README com **instruções que realmente funcionam do zero**.

---

## Critérios de um site bem-sucedido neste segmento

Aplicações de **finanças pessoais** competem em **confiança, clareza e velocidade**. O que importa:

1. **Confiabilidade dos dados**
   - Cálculos sempre corretos; saldo nunca diverge.
   - Operações destrutivas com confirmação.
   - Idempotência onde possível e logs auditáveis.
2. **Clareza visual e cognitiva**
   - Cores semânticas (verde = receita, vermelho = despesa).
   - Tipografia tabular para números (`tabular-nums`).
   - Hierarquia óbvia: saldo → categorias → histórico.
3. **Velocidade percebida**
   - Skeletons, optimistic UI, cache, bundle enxuto.
   - Tempo até a primeira interação curto (TTI).
4. **Segurança e privacidade**
   - Cabeçalhos de segurança, CORS estrito, dados sensíveis nunca em logs.
   - Em produção: autenticação, autorização, criptografia.
5. **Acessibilidade**
   - Não é opcional num app financeiro: cumpre WCAG, suporta leitor de tela, navegação só por teclado.
6. **Responsividade**
   - A maioria do tráfego financeiro é mobile. Mobile-first é regra, não diferencial.
7. **Internacionalização e localização**
   - Moeda e data formatadas pelo locale do usuário (`Intl`).
8. **Observabilidade**
   - Logs estruturados, healthchecks, métricas de erro.
9. **Manutenibilidade**
   - Código fácil de ler; arquitetura que aceita features novas sem reescrever o existente.
10. **Onboarding sem fricção**
    - “Clonou e rodou” em menos de 2 minutos. README confiável.

Este projeto endereça **todos os 10 pontos** de forma proporcional ao escopo do teste.

---

## Roadmap

- [ ] Autenticação (Auth.js / JWT) e multi-tenant.
- [ ] Edição de transações.
- [ ] Paginação e ordenação configurável.
- [ ] Gráficos (despesas por categoria, evolução mensal).
- [ ] Export CSV / importação OFX.
- [ ] Rate limiting e CSP estrita.
- [ ] CI no GitHub Actions (lint + test + docker build).
- [ ] Internacionalização completa (`next-intl`).
- [ ] PWA com modo offline.

---

## Licença

MIT — uso livre para fins de avaliação técnica.

