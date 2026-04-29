# Finance Control — Controle Financeiro Pessoal

Aplicação full-stack para controle de receitas e despesas, construída para atender rigorosamente ao escopo do arquivo `notes.txt`: API funcional, front-end consumindo dados reais, TypeScript forte, persistência, filtros, testes, Docker, tratamento de erros e documentação clara.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Front-end | Next.js 15, React 18, TypeScript, TailwindCSS, TanStack Query, React Hook Form, Zod |
| Back-end | Node.js 22 LTS, Express, TypeScript, Prisma, SQLite, Zod, Helmet, CORS, Morgan |
| Testes | Vitest, Supertest, Testing Library, jsdom |
| DevOps | Docker Compose, Dockerfiles multi-stage, healthcheck |

## Funcionalidades entregues

- Cadastro de transações com título, valor, tipo e categoria.
- Listagem de transações em ordem recente.
- Exclusão com confirmação antes da ação destrutiva.
- Cards de resumo: receitas, despesas e saldo.
- Filtro por busca textual, tipo e categoria.
- Persistência com SQLite e migrations Prisma versionadas.
- API com rotas obrigatórias:
  - `GET /transactions`
  - `POST /transactions`
  - `DELETE /transactions/:id`
  - `GET /summary`
- Healthcheck em `GET /health`.
- Validação no front e no back.
- Tratamento centralizado de erro com envelope JSON consistente.
- Interface responsiva, acessível e polida.
- Testes automatizados no back-end e no front-end.
- Docker Compose para subir a solução completa.

## Arquitetura

```text
chatgpt/
├── server/                 # API Express + Prisma
│   ├── prisma/             # schema e migrations SQLite
│   └── src/
│       ├── app.ts          # factory da aplicação Express
│       ├── index.ts        # boot HTTP e shutdown gracioso
│       ├── config/         # env e Prisma singleton
│       ├── controllers/    # entrada HTTP, resposta e status codes
│       ├── domain/         # tipos de domínio
│       ├── errors/         # HttpError padronizado
│       ├── middlewares/    # validação e erro centralizado
│       ├── repositories/   # contrato e implementação Prisma
│       ├── routes/         # roteamento Express
│       ├── schemas/        # schemas Zod
│       ├── services/       # regras de negócio
│       └── __tests__/      # testes de serviço e HTTP
├── web/                    # Next.js App Router
│   └── src/
│       ├── app/            # layout, providers e página principal
│       ├── components/     # UI reutilizável
│       ├── hooks/          # hooks TanStack Query
│       ├── lib/            # formatação e validação
│       ├── services/       # client HTTP e serviço de transações
│       ├── types/          # tipos compartilhados do front
│       └── __tests__/      # testes de validação e componente
└── docker-compose.yml
```

## Como rodar

### Opção 1 — Docker Compose

```bash
docker compose up --build
```

Acesse:

- Front-end: http://localhost:3000
- API: http://localhost:3333
- Healthcheck: http://localhost:3333/health

### Opção 2 — Local

Back-end:

```bash
cd chatgpt/server
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Front-end em outro terminal:

```bash
cd chatgpt/web
cp .env.example .env.local
npm install
npm run dev
```

Acesse http://localhost:3000.

## Testes

Back-end:

```bash
cd chatgpt/server
npm test
npm run test:coverage
```

Front-end:

```bash
cd chatgpt/web
npm test
npm run test:coverage
```

## Variáveis de ambiente

### Back-end

| Variável | Default | Descrição |
| --- | --- | --- |
| `NODE_ENV` | `development` | Ambiente de execução. |
| `PORT` | `3333` | Porta da API. |
| `DATABASE_URL` | `file:./dev.db` | Banco SQLite usado pelo Prisma. |
| `CORS_ORIGIN` | `http://localhost:3000` | Origem permitida no CORS. |

### Front-end

| Variável | Default | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3333` | URL base da API. |

## Contrato da API

Todas as respostas de sucesso usam `{ "data": ... }`. Erros usam `{ "error": { "code", "message", "details" } }`.

### `GET /transactions`

Query params opcionais:

- `type`: `INCOME` ou `EXPENSE`
- `category`: categoria exata
- `search`: busca parcial por título

### `POST /transactions`

Body:

```json
{
  "title": "Mercado",
  "amount": 250.5,
  "type": "EXPENSE",
  "category": "alimentação"
}
```

Decisão de domínio: o formulário recebe valor positivo e o `type` define o sinal. A API persiste despesas com `amount` negativo e receitas com `amount` positivo, respeitando a regra do briefing de que valor positivo representa receita e valor negativo representa despesa.

### `DELETE /transactions/:id`

- `id` deve ser UUID válido.
- Retorna `204` quando remove.
- Retorna `404` quando a transação não existe.

### `GET /summary`

```json
{
  "data": {
    "income": 5000,
    "expense": 250.5,
    "balance": 4749.5,
    "count": 2
  }
}
```

## Padrões aplicados

- **Layered Architecture**: rotas, controllers, services e repositories têm responsabilidades separadas.
- **Repository Pattern**: a camada de serviço depende de `ITransactionRepository`, não diretamente do Prisma.
- **Dependency Injection manual**: `createApp()` aceita repositório injetado, o que facilita testes com repositório em memória.
- **Factory Pattern**: `createApp()` cria a aplicação Express configurada.
- **DTO + Schema Validation**: Zod valida entrada HTTP e formulário.
- **Centralized Error Handling**: `HttpError` e middleware único padronizam erros.
- **Adapter Pattern no front**: `apiFetch()` adapta `fetch` para o envelope da API.
- **Custom Hooks**: hooks encapsulam cache, loading, error e mutações de transações.
- **Presentational Components**: componentes de UI recebem dados e callbacks por props.

## Boas práticas seguidas

### TypeScript e qualidade

- `strict` habilitado no front e no back.
- Tipos de domínio explícitos.
- `noUnusedLocals`, `noUnusedParameters` e `noUncheckedIndexedAccess` para capturar problemas cedo.
- Nomes claros e consistentes.

### API

- Validação na borda com Zod.
- Status HTTP corretos.
- Envelope de erro padronizado.
- Sanitização de erros inesperados.
- PrismaClient singleton.
- Shutdown gracioso desconectando o banco.
- `helmet`, CORS restrito e limite de payload.

### Front-end

- Server state gerenciado com TanStack Query.
- Formulário performático com React Hook Form.
- Validação compartilhável com Zod.
- Loading, empty, error e success states.
- Componentes pequenos e focados.
- UI mobile-first.

### Acessibilidade e UX

- Skip link para navegação por teclado.
- Uso de landmarks e headings semânticos.
- `aria-invalid`, `aria-describedby`, `aria-busy`, `role="dialog"` e `aria-modal`.
- Fechamento do modal por `Esc` e clique externo.
- Foco visível.
- Respeito a `prefers-reduced-motion`.
- Cores semânticas: verde para receitas e vermelho para despesas.
- Tipografia tabular para valores financeiros.

### Performance

- Cache de server state com `staleTime`.
- Invalidação seletiva após criação e exclusão.
- Next.js com output standalone para Docker.
- Sem biblioteca pesada de componentes.
- Índices no banco para `type`, `category` e `createdAt`.
- Skeletons para melhorar percepção de carregamento.

### Segurança

- `helmet` no back-end.
- CORS configurável e restrito.
- `x-powered-by` desabilitado no Express e no Next.
- Headers de segurança no Next.
- Validação estrita de payloads.
- UUID validado em rotas destrutivas.
- Prisma com queries parametrizadas.
- Sem segredos versionados.
- Mensagens de erro sanitizadas.

## Decisões técnicas e por quê

| Decisão | Motivo |
| --- | --- |
| Next.js + React + TypeScript | Atende ao requisito e oferece base moderna, tipada e escalável. |
| Express + TypeScript | API simples, clara e fácil de avaliar. |
| Prisma + SQLite | Persistência real com baixo atrito, migrations e fácil evolução para Postgres. |
| Despesa armazenada como valor negativo | Alinha com o briefing e torna o saldo uma consequência natural dos dados. |
| `type` mantido além do sinal | Simplifica filtros, leitura do domínio e UI. |
| Zod no front e no back | Validação previsível e mensagens claras. |
| TanStack Query | Evita estado manual frágil para dados remotos. |
| Repository Pattern | Facilita testes e troca de persistência. |
| Docker Compose | Permite avaliação rápida com um único comando. |
| Testes com repositório em memória | Mantém testes rápidos e focados nas regras/rotas. |

## Robustez para uso real

A solução é adequada para evoluir porque possui:

- Separação clara de responsabilidades.
- Contratos de API bem definidos.
- Validação de entrada em todas as bordas.
- Persistência versionada.
- Testes cobrindo regras essenciais e fluxo HTTP.
- UI preparada para estados reais de rede.
- Estrutura de Docker para execução reprodutível.
- Cuidados básicos de segurança e acessibilidade.

Para produção completa, os próximos passos naturais seriam autenticação, multiusuário, paginação, auditoria, rate limiting, observabilidade estruturada e backups do banco.

## O que torna um site de finanças pessoais bem-sucedido

1. **Confiabilidade dos cálculos**: saldo, receitas e despesas não podem divergir.
2. **Clareza visual**: valores, categorias e tipos precisam ser entendidos rapidamente.
3. **Baixa fricção**: cadastrar e excluir transações deve ser rápido e seguro.
4. **Segurança e privacidade**: dados financeiros exigem validação, controle de origem e ausência de vazamento de erros.
5. **Acessibilidade**: o produto precisa funcionar com teclado, leitores de tela e diferentes dispositivos.
6. **Responsividade**: finanças pessoais são consultadas frequentemente no celular.
7. **Performance percebida**: loading states e cache melhoram confiança no produto.
8. **Manutenibilidade**: arquitetura limpa permite adicionar edição, gráficos, recorrência e autenticação sem reescrever tudo.
9. **Documentação confiável**: avaliadores e novos devs precisam conseguir rodar o projeto sem adivinhação.
10. **Evolução técnica simples**: migrations, repository pattern e tipos fortes reduzem risco de mudanças.

## Roadmap

- Edição de transações.
- Paginação e ordenação configurável.
- Gráficos por categoria e evolução mensal.
- Exportação CSV.
- Autenticação e multiusuário.
- Rate limiting e observabilidade.
- CI com lint, testes e build Docker.
