type Usuario = { nome: string, email: string, cell: string }
type Admin = Usuario & { permissao: boolean }

type UsuarioComumOuAdmin = Usuario | Admin

function mostrarDados(dado: UsuarioComumOuAdmin) {
    if ("permissao" in dado) {
        console.log("Permissão");
    } else {
        console.log("Nome do usuário");
    }
}