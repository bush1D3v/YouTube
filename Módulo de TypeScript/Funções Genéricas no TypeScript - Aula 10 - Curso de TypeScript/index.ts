function identity<T>(valor: T): T {
    return valor;
}

identity<number>(10);

function primeiroElemento<T>(array: T[]): T {
    return array[0]
}

primeiroElemento<number>([1, 2, 3])
primeiroElemento<string>(["a", "b", "c"])

interface Nome {
    nome: string;
}

function saudar<T extends Nome>(obj: T): string {
    return `Olá, ${obj.nome}`
}

interface Usuario {
    idade: number;
    nome: string;
    email: string;
}

saudar<Usuario>({ nome: "vfdfdfdf", idade: 19, email: ""})

function combinar<T, U>(a: T, b: U): [T, U] {
    return [a, b]
}

combinar<string, number>("", 0)

function wrapInArray<T = string>(valor?: T): T[] {
    return valor ? [valor] : []
}

wrapInArray("123")
wrapInArray<number>(123)