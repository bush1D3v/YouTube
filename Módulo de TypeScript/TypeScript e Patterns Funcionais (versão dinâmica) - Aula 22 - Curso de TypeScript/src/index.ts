function logMensagem(mensagem: string) {
    console.log(mensagem);
}

function executa(fn: (msg: string) => void, message: string) {
    fn(message)
}

executa(logMensagem, "Olá, mundo!")

//////////////////////////////////////////////////////

function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return (a: A) => g(f(a));
}

const toUpper = (s: string) => s.toUpperCase();
const exclam = (s: string) => s + "!";

const gritar = pipe(toUpper, exclam);

console.log(gritar("typescript")); //TYPESCRIPT!

const toLower = (s: string) => s.toLowerCase();
const sussurar = (s: string) => s + "...";

const sussurrar = pipe(toLower, sussurar)

console.log(sussurrar("TYPESCRIPT")); //typescript...

//////////////////////////////////////////////////////

const numeros = [1, 2, 3, 4];

function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
    return arr.map(fn)
}

function multiplicar(n: number): number {
    return n * 2;
}
const dobrados = map<number, number>(numeros, n => multiplicar(n))
console.log(dobrados); // [2, 4, 6, 8]

//////////////////////////////////////////////////////

function soma(n1: number) {
    return (n2: number) => n1 + n2; //n1 = 10, n2 = 5
}

const somaDez = soma(10);
console.log(somaDez(5)); // 15

//////////////////////////////////////////////////////

const numerosALer: readonly number[] = [1, 2, 3, 4];

//////////////////////////////////////////////////////

const pipeline = pipe(
    (n: number) => n + 1,
    (n: number) => n * 2
);

console.log(pipeline(5)); // 12