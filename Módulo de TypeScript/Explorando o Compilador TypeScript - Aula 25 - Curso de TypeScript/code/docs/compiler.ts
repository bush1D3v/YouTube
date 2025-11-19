// API exposta para usarmos no Node, com:
// Ler arquivos
// Rodar checagem de tipos
// Gerar arquivo JS
// Inspeionando/modificando o AST

// ts.createProgram (função principal) que recebe:

// lista de arquivos
// opções de compilação
// um host que define como ele acessa o sistema de arquivos

// ts.createProgram(files, options, host?) -> program {
//     program.emit() -> JS
//     program.getTypeChecker() -> TS Checker
//    
// }