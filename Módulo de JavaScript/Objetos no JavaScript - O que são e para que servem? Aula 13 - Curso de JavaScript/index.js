/**
 * @type {{ nome: string, idade: number, email: string, endereco: {
*      zipCode: number, 
*  } 
* }}
*/
const usuario = {
   nome: "Carlos",
   idade: 25,
   email: "carlos@gmail.com",
}

for (const chave in usuario) {
   console.log(`${chave}: ${usuario[chave]}`);
}

const novoUsuario = { ...usuario, idade: 30}