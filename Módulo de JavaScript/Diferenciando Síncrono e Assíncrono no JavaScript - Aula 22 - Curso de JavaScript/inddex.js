console.log("Início");
// for (let i = 0; i < 3; i++) {
//     console.log(i);
// }
setTimeout(() => {
    console.log("Isso aparece depois de 2 segundos");
}, 2000)
console.log("Fim");

console.log("Carregando dados...");
for (let i =0; i < 100000000; i++) {}
setTimeout(() => {
    console.log("Dados carregados!");
}, 2 * 1000)

async function buscarDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Dados recebidos!")
        }, 3 * 1000);
    })
}

async function carregarDados() {
    console.log("Buscando informações...");
    const resposta = await buscarDados();
    console.log(resposta);
}

carregarDados();