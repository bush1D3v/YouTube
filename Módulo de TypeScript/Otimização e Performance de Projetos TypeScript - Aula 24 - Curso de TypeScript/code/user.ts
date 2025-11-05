type User = {
    id: string;
    nome: string;
    email: string;
    senha: string;
    idade: number;
}

function getUserName(u: User) {
    console.log(u.nome);
}

function getUserEmail(u: User) {
    console.log(u.email);
}

function getUserIdade(u: User) {
    console.log(u.idade);
}

export {
    getUserName,
    getUserEmail,
    getUserIdade
}
