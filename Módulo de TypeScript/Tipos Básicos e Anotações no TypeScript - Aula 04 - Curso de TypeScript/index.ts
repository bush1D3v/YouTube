const idade: number = 18;

const nome: string = "Victor";

const admin: boolean = true;

const nada: null = null;

const indefinida: undefined = undefined;

const numero: number = 18;

const user: unknown = "victor"

try {

} catch (error) {

}

function soma(n1: number, n2: number) {
    return n1 + n2;
}

function exibirMenu(message: string) {
    // codigo para exibir menu
}

function lancarErro(message: string): never {
    throw new Error(message);
}
