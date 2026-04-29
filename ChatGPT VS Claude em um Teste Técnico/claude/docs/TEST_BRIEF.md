# Original Test Brief

This is the original technical-test brief, preserved as reference.

---

## Teste Técnico — FullStack Júnior

**Prazo:** 7 dias a partir do recebimento deste documento.

### O que você vai construir

Um sistema simples de controle financeiro pessoal. O usuário registra receitas e despesas, vê o saldo atual e consulta o histórico de transações.

### Endpoints obrigatórios

| Método | Rota | O que faz |
|--------|------|-----------|
| `GET` | `/transactions` | Lista todas as transações |
| `POST` | `/transactions` | Cria uma nova transação |
| `DELETE` | `/transactions/:id` | Remove uma transação |
| `GET` | `/summary` | Retorna o saldo (receitas - despesas) |

### Estrutura da `Transaction`

- `id`, `title`, `amount`, `category`, `createdAt`

### Stacks

- **Back-end:** Node.js + Express + TypeScript
- **Front-end:** Next.js + React + TypeScript

### Avaliação

- API funciona corretamente?
- Front-end consome e exibe os dados certo?
- TypeScript usado de verdade?
- Código fácil de ler e navegar?
- README funciona?
- Tem tratamento de erro?

### Diferenciais (não obrigatórios)

- Filtro por tipo ou categoria
- Persistência com banco
- Testes
- Interface responsiva
