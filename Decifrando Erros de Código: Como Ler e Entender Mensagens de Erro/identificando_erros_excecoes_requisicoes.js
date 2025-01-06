/**
 * Identificando Erros e Exceções em Requisições HTTP
 *
 * Este arquivo explica como interpretar diferentes códigos de status HTTP,
 * diferenciando entre erros, exceções e bugs.
 */

// 1. Código de Status 200 - OK
// Significa que a requisição foi bem-sucedida e o servidor retornou os dados esperados.
const response200 = {
    status: 200,
    statusText: "OK",
    data: { message: "Success" }
};
console.log("Status 200:", response200);

// 2. Código de Status 400 - Bad Request
// Significa que a requisição foi malformada ou contém parâmetros inválidos.
// Este é um erro, mas não é uma exceção ou bug. É um erro esperado quando a requisição é inválida.
const response400 = {
    status: 400,
    statusText: "Bad Request",
    data: { error: "Invalid request parameters" }
};
const body400 = {
    email: "victor@testecom"
}
console.log("Status 400:", response400);

// 3. Código de Status 401 - Unauthorized
// Significa que a requisição não foi autorizada. Pode ser necessário autenticar-se.
// Este é um erro, mas não é uma exceção ou bug. É um erro esperado quando a autenticação é necessária.
// JWT (JSON Web Token) é um método comum de autenticação.
const response401 = {
    status: 401,
    statusText: "Unauthorized",
    data: { error: "Authentication required" }
};
console.log("Status 401:", response401);

// 4. Código de Status 403 - Forbidden
// Significa que o servidor entendeu a requisição, mas se recusa a autorizá-la.
// Este é um erro, mas não é uma exceção ou bug. É um erro esperado quando o acesso é proibido.
// /private é um exemplo de rota que requer autorização.
// admin (maior permissão) - user (menor permissão)
const response403 = {
    status: 403,
    statusText: "Forbidden",
    data: { error: "Access denied" }
};
console.log("Status 403:", response403);

// 5. Código de Status 404 - Not Found
// Significa que o recurso solicitado não foi encontrado no servidor.
// Este é um erro, mas não é uma exceção ou bug. É um erro esperado quando o recurso não existe.
const response404 = {
    status: 404,
    statusText: "Not Found",
    data: { error: "Resource not found" }
};
console.log("Status 404:", response404);

// 6. Código de Status 500 - Internal Server Error
// Significa que ocorreu um erro no servidor ao processar a requisição.
// Este é um erro e pode ser considerado uma exceção, pois não é esperado.
const response500 = {
    status: 500,
    statusText: "Internal Server Error",
    data: { error: "An unexpected error occurred on the server" }
};
console.log("Status 500:", response500);

// 7. Código de Status 502 - Bad Gateway
// Significa que o servidor, ao atuar como um gateway ou proxy, recebeu uma resposta inválida do servidor upstream.
// Este é um erro e pode ser considerado uma exceção, pois não é esperado.
const response502 = {
    status: 502,
    statusText: "Bad Gateway",
    data: { error: "Invalid response from upstream server" }
};
console.log("Status 502:", response502);

// try {
//     bcrypt.hash("password", 10, (error, hash) => {
//         if (error) {
//             throw new Error("Error hashing password");
//         }
//         console.log("Hash:", hash);
//     });
// } catch (error) {
    // disparo do erro inesperado
// }

/**
 * Resumo:
 * - Erros: 404, 400, 401, 403 (erros esperados)
 * - Exceções: 500, 502 (erros inesperados)
 * - Bugs: Não são representados diretamente por códigos de status HTTP, mas podem ser identificados
 *   quando o comportamento do servidor não corresponde ao esperado, mesmo com códigos de status válidos.
 */
