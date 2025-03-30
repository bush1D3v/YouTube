// const dataAtual = new Date();
// console.log(dataAtual);

// const dataNascimento = new Date(2000, 5, 15);
//console.log(dataNascimento);

// console.log(dataNascimento.getFullYear());
// console.log(dataNascimento.getMonth());
// console.log(dataNascimento.getDate());

// const agora = new Date();
// console.log(agora.toLocaleDateString("pt-br"));

// const futura = new Date();
// futura.setDate(futura.getDate() + 7)
// console.log(agora.toLocaleDateString("pt-br"), agora.toLocaleTimeString("pt-br"));

const data1 = new Date("2024-04-01");
const data2 = new Date("2024-04-15");

if (data1 < data2) {
    console.log("data1 é antes da data2");
} else {
    console.log("data2 é antes da data1");
}