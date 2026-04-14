# Teste Técnico — FullStack Júnior

**Prazo:** 7 dias a partir do recebimento deste documento.

---

## O que você vai construir

Um sistema simples de controle financeiro pessoal. O usuário registra receitas e despesas, vê o saldo atual e consulta o histórico de transações.

Nada de autenticação, nada de complexidade desnecessária. O foco é ver como você organiza o código e resolve problemas básicos do dia a dia de desenvolvimento.

---

## Back-end — Node.js + Express + TypeScript

A API precisa ter os seguintes endpoints:

| Método | Rota | O que faz |
|--------|------|-----------|
| `GET` | `/transactions` | Lista todas as transações |
| `POST` | `/transactions` | Cria uma nova transação |
| `DELETE` | `/transactions/:id` | Remove uma transação |
| `GET` | `/summary` | Retorna o saldo (receitas - despesas) |

Cada transação deve ter:

- `id` — gerado pelo back-end
- `title` — descrição
- `amount` — valor (positivo = receita, negativo = despesa)
- `category` — categoria livre (ex: alimentação, salário)
- `createdAt` — data de criação

Os dados podem ficar em memória, num array mesmo. Banco de dados não é obrigatório.

Valide os campos no `POST`. Se chegar algo incompleto, retorne um erro com mensagem clara.

---

## Front-end — Next.js + React + TypeScript

A tela principal precisa mostrar:

- Três cards: total de receitas, total de despesas e saldo atual
- Lista ou tabela com as transações cadastradas
- Botão para abrir o formulário de nova transação
- Opção de excluir cada transação

O formulário de cadastro precisa ter:

- Título
- Valor
- Tipo: receita ou despesa
- Categoria

Consuma a API que você criou no back-end.

---

## Como rodar

Configure tudo para rodar localmente. As instruções abaixo precisam funcionar do zero, sem configuração extra.

**Pré-requisitos:** Node.js 18+ e npm ou yarn.

```bash
# Back-end
cd server
npm install
npm run dev
# Rode na porta 3333
```

```bash
# Front-end
cd web
npm install
npm run dev
# Rode na porta 3000
```

---

## Estrutura sugerida

```
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── index.ts
│   └── package.json
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
└── README.md
```

Pode organizar diferente se preferir. Só garanta que faz sentido navegar pelo código.

---

## O que vamos olhar

- A API funciona corretamente?
- O front-end consome e exibe os dados certo?
- O TypeScript está sendo usado de verdade, com tipagem, não só no nome do arquivo?
- O código é fácil de ler e navegar?
- As instruções no README funcionam de verdade?
- Tem tratamento de erro, pelo menos no básico?

---

## Não é obrigatório, mas conta

- Filtro por tipo ou categoria
- Persistência com banco de dados (SQLite já resolve)
- Testes (Jest ou Vitest)
- Interface responsiva

---

## Entrega

Suba tudo num repositório **público no GitHub** com um README que explique como rodar o projeto.

Mande o link para **[seu-email@empresa.com]** com o assunto:
`Teste FullStack Júnior — Seu Nome`

Repositório privado ou sem instruções de execução não será avaliado.

---

Qualquer dúvida, mande um e-mail. Boa sorte.
