enum StatusPedidoNumerico {
    Pendente,
    Processando,
    Enviado,
    Entregue
}

console.log(StatusPedidoNumerico.Enviado); // 2

enum StatusPedidoTextual {
    Pendente = "pendente",
    Processando = "processando",
    Enviado = "enviado",
    Entregue = "entregue"
}

console.log(StatusPedidoNumerico.Enviado); // "enviado"

interface Usuario {
    nome: string;
    status: StatusPedidoTextual
}

const usuario: Usuario = {
    nome: "Fulano",
    status: StatusPedidoTextual.Pendente
}

// ==========================================================

type Tamanho = "P" | "M" | "G";

function selecionarTamanho(t: Tamanho) {
    console.log(`Tamanho selecionado: ${t}`);
}

selecionarTamanho("M");

// ==========================================================

const Cores = {
    Primaria: "#FF0000",
    Secundaria: "#00FF00"
} as const;

type Cor = keyof typeof Cores;

function escolherCor(cor: Cor) {
    console.log(`Você escolheu: ${Cores[cor]}`);
}