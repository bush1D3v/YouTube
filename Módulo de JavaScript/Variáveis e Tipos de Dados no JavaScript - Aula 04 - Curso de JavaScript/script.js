const nomePessoa1 = "Navarro";
let nomePessoa2 = "Navarro"; // This let declares a variable that is only assigned once.
var nomePessoa3 = "Navarro"; // Use let or const instead of var.

/**
 * @type {string}
 */
const nomePessoa = "Navarro";

/**
 * @type {number}
 */
const teste = 100.80;

/**
 * @type {boolean}
 */
const verdade = false;

/**
 * @type {null}
 */
const vazio = null;

/**
 * @type {undefined}
 */
const naoSei = undefined;

/**
 * @type {{nome: string, telefone: number, endereco: null}}
 */
const usuario = {
    nome: nomePessoa,
    telefone: 545435435,
    endereco: null,
}

// Valor indefinido, pois o objeto nao possui esta chave, esta propriedade
const usuarioSobrenome = usuario.sobrenome;
