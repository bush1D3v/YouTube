// O que são Arrays?
const blocos = ['Pedra', 'Madeira', 'Areia', 'Obsidiana'];
const mobs = ['Creeper', 'Enderman', 'Zumbi', 'Esqueleto'];

// O que são Objetos?

const mob = {
    nome: 'Enderman',
    vida: 40,
    hostil: true
};
  
console.log(mob.nome); // "Enderman"

// Trabalhando com Arrays e Objetos em conjunto

// 1. Armazenando objetos dentro de arrays
const inventario = [
    { item: 'Espada de Diamante', dano: 7 },
    { item: 'Maçã Dourada', cura: 10 },
    { item: 'Escudo', defesa: 5 }
];
  
console.log(inventario[0].item); // "Espada de Diamante"

// 2. Encontrando um objeto dentro de um array
const itemEncontrado = inventario.find(item => item.item === 'Maçã Dourada');
console.log(itemEncontrado); // { item: 'Maçã Dourada', cura: 10 }

// 3. Agrupando um array de objetos
const danoTotal = inventario.reduce((acc, item) => acc + (item.dano || 0), 0);

console.log(`Dano total: ${danoTotal}`);

// 4. Usando diferentes tipos de dados dentro de um array
const jogador = [
    'Steve',
    20,
    { armadura: 'Diamante', resistencia: 8 },
    ['Espada de Ferro', 'Escudo', 'Picareta de Pedra']
];
  
console.log(jogador[2].armadura); // "Diamante"