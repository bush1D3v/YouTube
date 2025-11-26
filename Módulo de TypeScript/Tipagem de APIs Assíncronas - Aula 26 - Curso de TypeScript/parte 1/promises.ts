const promiseDeNumero: Promise<number> = Promise.resolve(42);

promiseDeNumero
.then((valor) => {
    console.log("Valor: ", valor);
})
.catch((erro) => {
    console.error("Erro retornado: ", erro);
})
.finally(()=> {
    console.log("Terminou a execução");
})

const promises: Promise<number>[] = [
    Promise.resolve(1),
    Promise.resolve(2)
]

const tudo: Promise<number[]> = Promise.all(promises);