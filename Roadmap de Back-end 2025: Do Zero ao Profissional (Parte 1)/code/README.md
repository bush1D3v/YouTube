# Simple CRUD Express (funcional)

## Rodar local (Postgres)
1) Copie o `.env.example` para `.env` e ajuste o `DATABASE_URL`
2) Instale dependências:
```bash
npm install
```
3) Rode:
```bash
npm run dev
```
- API: http://localhost:3000
- Swagger: http://localhost:3000/docs

## Rodar com Docker (API + Postgres)
```bash
docker compose up --build
```

## Testes
```bash
npm tests
```

## Rotas
- POST `/auth/register`
- POST `/auth/login`
- GET `/users/:id` (Bearer token)
- PUT `/users/:id` (Bearer token, owner only)
- DELETE `/users/:id` (Bearer token, owner only)
