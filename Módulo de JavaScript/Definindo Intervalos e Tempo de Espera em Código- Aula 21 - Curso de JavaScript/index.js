// setTimeout(() => {
//     console.log("Executando depois de 3 segundos");
// }, 3 * 1000);

// setInterval(() => {
//     console.log("Executado após 3 segundos");
// }, 3 * 1000);

// function mostrarMensagem() {
//     const mensagem = document.createElement("div");
//     mensagem.innerText = "Cadastro realizado com sucesso!";
//     document.body.appendChild(mensagem);

//     setTimeout(() => {
//         mensagem.remove();
//     }, 5 * 1000)
// }

// mostrarMensagem();

// let contador = 0;
// const intervalo = setInterval(() => {
//     contador++;
//     console.log(`Tempo: ${contador}s`);
//     if (contador === 10) {
//         clearInterval(intervalo);
//     }
// }, 1 * 1000);

// console.log("Buscando dados...");
// setTimeout(() => {
//     console.log("Dados carregados!");
// }, 3 * 1000)

const texto = "Aprender JavaScript é top!";
let index = 0;

function escreverTexto() {
    if (index < texto.length) {
        document.body.innerHTML += texto[index];
        index++;
    } else {
        clearInterval(intervalo);
    }
}

const intervalo = setInterval(escreverTexto, 200)