interface Produto {
    nome: string;
    preco: number;
    estoque: number;
}

function atualizarProduto(produto: Produto, atualizacoes: Partial<Produto>) {
    return { ...produto, ...atualizacoes }
}

type ProdutoSemEstoque = Omit<Produto, "estoque">;
type ProdutoNomeEstoque = Pick<Produto, "nome" | "estoque">;

type Status = "ativo" | "inativo";

const usuarios: Record<Status, string[]> = {
    ativo: ["João", "Maria"],
    inativo: ["Carlos"]
}

type Tipos = "email" | "telefone" | "senha";

type Privado = Exclude<Tipos, "email">;
type Publico = Extract<Tipos, "email">;

type PodeSerNulo = string | null | undefined;

type SemNulo = NonNullable<PodeSerNulo>;

function saudacao(nome: string, email: string) {
    console.log(`Olá, ${nome}`);
}

type Retorno = ReturnType<typeof saudacao>;
type Parametros = Parameters<typeof saudacao>