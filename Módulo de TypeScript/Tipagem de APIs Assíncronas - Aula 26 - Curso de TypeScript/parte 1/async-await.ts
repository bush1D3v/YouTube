async function pegaNumero(): Promise<number> {
    return 10;
}

async function somaComVinte(): Promise<number> {
    const valor = await pegaNumero();
    return valor + 20;
}

async function exemploErro(): Promise<void> {
    try {
        const resultado = await somaComVinte();
        console.log("Resultado: ", resultado);
    } catch (error) {
        console.error(error);
    }
}