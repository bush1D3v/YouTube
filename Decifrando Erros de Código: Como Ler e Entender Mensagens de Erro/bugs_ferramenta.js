/**
 * Bugs Relacionados a uma Ferramenta Não Funcionar Como Deveria
 *
 * Este arquivo explica como identificar e diferenciar erros, exceções e bugs
 * em ferramentas como IDEs e bibliotecas.
 */

// 1. Erro de Sintaxe
// Um erro de sintaxe ocorre quando há um problema na estrutura do código.
// Exemplo: Esquecer de fechar uma chave ou parêntese.
try {
	eval("if (true { console.log('Missing parenthesis'); }");
} catch (error) {
	console.log("Erro de Sintaxe:", error.message);
}

// 2. Exceção em Tempo de Execução
// Uma exceção ocorre durante a execução do código, geralmente devido a um problema inesperado.
// Exemplo: Tentar acessar uma propriedade de uma variável indefinida.
try {
	let obj;
	// obj.property = "value";
	console.log(obj.property);
} catch (error) {
	console.log("Exceção em Tempo de Execução:", error.message);
}

// 3. Bug em uma Biblioteca
// Um bug é um problema no código de uma biblioteca ou ferramenta que causa um comportamento inesperado.
// Exemplo: Um bug conhecido na biblioteca moment.js que causa um erro ao formatar datas específicas.
const moment = require("moment");

try {
	// Suponha que há um bug conhecido na versão atual do moment.js que causa um erro ao formatar esta data específica
	const date = moment("2023-10-15").format("YYYY-MM-DD");
	console.log(date);
} catch (error) {
	console.log("Bug na Biblioteca moment.js:", error.message);
	console.log(
		"Verifique se há atualizações ou patches disponíveis para a biblioteca moment.js",
	);
}

/**
 * Resumo:
 * - Erros de Sintaxe: Problemas na estrutura do código que impedem a execução.
 * - Exceções em Tempo de Execução: Problemas inesperados que ocorrem durante a execução do código.
 * - Bugs: Problemas no código de uma biblioteca ou ferramenta que causam comportamentos inesperados.
 */
