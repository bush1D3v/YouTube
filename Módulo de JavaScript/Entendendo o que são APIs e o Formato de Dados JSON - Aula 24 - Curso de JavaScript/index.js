fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(dados => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        dados.forEach(usuario => {
            console.log(usuario);
            console.log(`Nome: ${usuario.name} - Email: ${usuario.email}`);
        })
    })
    .catch(erro => console.error("Deu erro na requisição", erro));