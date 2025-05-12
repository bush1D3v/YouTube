interface Produto {
    nome: string;
    preco: number;
}

const camiseta: Produto = {
    nome: "camiseta",
    preco: 59.90
}

interface Pessoa {
    nome: string;
    idade: number;
    endereco?: string;
}

interface Carro {
    readonly modelo: string;
}

const jeep: Carro = {
    modelo: "toyota"
}

function comunicar(fala: string) {
    return fala;
}

interface Animal {
    nome: string;
    idade: number;
}

interface Cachorro extends Animal {
    latir: (fala: string) => string;
}

const caramelo: Cachorro = {
    latir: (fala: string) => comunicar(fala),
    nome: "cachorrinho caramelo",
    idade: 7
}

interface Usuario {
    nome: string;
    email: string;
    exibirInfo(): void
}

class Cliente implements Usuario {
  nome: string;
  email: string;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  exibirInfo() {
    console.log(`Cliente: ${this.nome} | Email: ${this.email}`);
  }
}

const cliente = new Cliente("maria", "maria@gmail.com")
cliente.exibirInfo();
