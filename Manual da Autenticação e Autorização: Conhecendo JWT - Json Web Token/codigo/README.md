# Auth JWT (Node.js + Express + TypeScript)

Projeto de autenticação simples com registro, login (gera JWT) e rota protegida.

## Rotas
- POST /register { email, password }
- POST /login { email, password }
- GET /dashboard (Authorization: Bearer <token>)

## Como rodar
1. Copie `.env.example` para `.env` e ajuste o `JWT_SECRET`.
2. Dev:
```bash
npm run dev
```
3. Build e start:
```bash
npm run build
npm start
```

## Teste rápido (curl)
```bash
# registrar
curl -s -X POST http://localhost:3000/register -H 'Content-Type: application/json' -d '{"email":"a@a.com","password":"123"}'
# login
TOKEN=$(curl -s -X POST http://localhost:3000/login -H 'Content-Type: application/json' -d '{"email":"a@a.com","password":"123"}' | jq -r .token)
# dashboard
curl -s http://localhost:3000/dashboard -H "Authorization: Bearer $TOKEN"
```

Banco em memória apenas para fins didáticos.
