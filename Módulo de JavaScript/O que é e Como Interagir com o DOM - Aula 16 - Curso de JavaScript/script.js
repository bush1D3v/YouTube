// Selecionando elementos
const titulo = document.getElementById('titulo');
const paragrafo = document.querySelector('.paragrafo');
const botao = document.getElementById('meuBotao');
const paragrafoRemover = document.querySelector('.paragrafoRemover')
const paragrafoAdicionar = document.createElement('p');
paragrafoAdicionar.innerText = 'Este é um paragrafo adicionado via JavaScript'

// Adicionando evento de clique
botao.addEventListener('click', () => {
    // paragrafo.innerText = 'O texto foi alterado com JavaScript!';
    // titulo.classList.toggle('destaque');
    // paragrafoRemover.remove();
    // document.body.appendChild(paragrafoAdicionar);
    alert('Botão clicado')
});

// document.getElementsByClassName('paragrafo');
// document.getElementsByTagName('p');
// document.querySelectorAll('.pagrafo');