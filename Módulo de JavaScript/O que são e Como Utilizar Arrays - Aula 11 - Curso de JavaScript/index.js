const esportes = [
    ['futebol', 'basquete'], // esportes coletivos
    ['atletismo', 'ginastica'], //esportes individuais
    ['ciclismo', 'motocross'] //esportes de velocidade
]

// // Metodo forEach()

// esportes.forEach((categoria, indexCategoria) => {
//     console.log(`Categoria ${indexCategoria + 1}: `);
//     // biome-ignore lint/complexity/noForEach: <explanation>
//     categoria.forEach((esporte) => {
//         console.log(esporte);
//     })
// })

const esportesComCategoria = esportes.filter((_, index) => index + 1 === 1);

const totalEsportes = esportes.flat().reduce((acc, esporte) => acc + 1, 0);

for (let i = 0; i < esportes.length; i++) {
    for (let k = 0; k < esportes[i].length; k++) {
        console.log(`Elemento na posição [${i}][${k}]: ${esportes[i][k]}`);
    }
}