function formatar(valor: string | number) {
    if (typeof valor === "string") {
        return valor.toUpperCase();
    }
    return valor.toFixed(2);
}

class Usuario {
    constructor(public nome: string) {}
}

function verificar(valor: unknown) {
    if (valor instanceof Usuario) {
        console.log(`Nome: ${valor.nome}`);
    }
}

const user = new Usuario("victor")

verificar(user)

type Carro = { modelo: string }
type Moto = { cilindradas: number }

function mostrarInfo(veiculo: Carro | Moto) {
    if ("modelo" in veiculo) {
        console.log("carro");
    } else {
        console.log("moto");
    }
}

type Produto = { nome: string }
type Servico = { descricao: number }

function isProduto(obj: any): obj is Produto {
    return "nome" in obj;
}

function garantirTexto(valor: unknown): asserts valor is string {
    if (typeof valor !== "string") {
        throw new Error("Não é uma string")
    }
}