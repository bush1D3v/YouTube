const numeros = [10, 25, 30, 45, 50];

// FILTER - Filtra elementos maiores que 25
const maioresQue25 = numeros.filter(num => num > 24);
console.log("Filter:", maioresQue25);

// MAP - Multiplica todos os números por 2
const dobrados = numeros.map(num => num*2);
console.log("Map:", dobrados);

// REDUCE - Soma todos os números do array
const somaTotal = numeros.reduce((acumulador, num) => acumulador + num, 0);
console.log("Reduce:", somaTotal);