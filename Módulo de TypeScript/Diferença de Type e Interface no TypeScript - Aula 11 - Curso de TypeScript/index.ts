type Status = "ativo" | "inativo" | "pendente"

function setStatus(s: Status) {
    console.log(`Status atualizado para: ${s}`);
}

interface Usuario {
    nome: string;
    idade: number;
}

interface Usuario {
    email: string;
}

const user: Usuario = {
    nome: "Victor",
    idade: 10,
    email: "victornavarro@gmail.com"
}

interface Animal {
    nome: string;
    idade: number;
}

interface Cachorro extends Animal {
    raca: string;
    domestico: boolean;
}

type Pessoa = {
    nome: string;
}

type Client = Pessoa & {
    id: number;
}