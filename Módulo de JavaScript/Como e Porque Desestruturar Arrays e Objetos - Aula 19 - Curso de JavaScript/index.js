// const numeros = [10, 20, 30, 40, 50, 60, 70];
// const [primeiroNumero, ...restoNumeros] = numeros;
// console.log(primeiro); 
// console.log(resto);

const pessoa = { nome: "João", idade: 25, cidade: "São Paulo" };
// const { nome: pessoaNome, idade: pessoaIdade } = pessoa;
// console.log(pessoaNome, pessoaIdade);

function mostrarDados({ nome, idade = 20 }) {
    console.log(`Nome: ${nome}, Idade: ${idade}`);
}

mostrarDados(pessoa)