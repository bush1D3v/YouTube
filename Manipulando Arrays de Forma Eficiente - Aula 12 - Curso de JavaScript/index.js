const numeros = [1, 2, 3, 5, 4];

// // biome-ignore lint/complexity/noForEach: <explanation>
// numeros.forEach(numero => {
//     console.log(`Numero: ${numero}`);
// })

const dobrados = numeros.map(numero => numero * 2)

const maioresQue3 = numeros.filter(numero => numero > 3)

const somaTotal = numeros.reduce((acumulador, numero) => acumulador + numero, 0)

const encontrado = numeros.find(numero => numero >= 4)

console.log(encontrado);