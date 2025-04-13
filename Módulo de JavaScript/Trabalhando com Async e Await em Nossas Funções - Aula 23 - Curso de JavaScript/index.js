async function exemploAsyncAwait() {
    try {
        const respostaUsuario = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const usuario = await respostaUsuario.json();
        console.log(usuario.name);

        const respostaPosts = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`
        );
        const posts = await respostaPosts.json();
        console.log(`${posts.length} posts encontrados`);
    } catch (error) {
        console.error("Promise error:", error)
    }
}

function exemploThenCatch() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(resposta => resposta.json())
        .catch(erro => console.error("Promise error:", erro))
        .then(usuario => {
            console.log(`Promise: ${usuario.name}`);
        })
        .catch(erro => console.error("Promise error:", erro))

    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`)
        .then(resposta => resposta.json())
        .catch(erro => console.error("Promise error:", erro))
        .then(posts => {
            console.log(`Promise: ${posts.length} posts encontrados`);
        })
        .catch(erro => console.error("Promise error:", erro))
}

async function buscarParalelo() {
    try {
        const promiseUsuarios = fetch('https://jsonplaceholder.typicode.com/users');
        const promisePosts = fetch('https://jsonplaceholder.typicode.com/posts');

        const [respostaUsuarios, respostaPosts] = await Promise.all([
            promiseUsuarios,
            promisePosts
        ]);

        const usuarios = await respostaUsuarios.json();
        const posts = await respostaPosts.json();

        console.log(usuarios);
        console.log(posts);
    } catch (error) {
        console.error("Erro ao buscar dados", error);
    }
}

buscarParalelo();