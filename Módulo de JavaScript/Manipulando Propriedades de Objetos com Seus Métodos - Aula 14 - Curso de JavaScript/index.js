// const usuario = {
//     nome: "Carlos",
//     email: "carlos@gmail.com",
//     senha: "1243434",
//     saudacao: function() {
//         return `Olá, meu nome é ${this.nome}!`
//     },
//     validaNome: function(nomeChute) {

//     }
// }

// console.log(usuario.saudacao());

const bancoDeDados = {
    usuarios: [
        { id: 1, nome: "Carlos", idade: 25},
        { id: 2, nome: "Maria", idade: 30},
    ],
    adicionarUsuario(usuario) {
        this.usuarios.push(usuario)
    }
}

bancoDeDados.adicionarUsuario({ id: 3, nome: "João", idade: 28})

console.log(bancoDeDados.usuarios);
