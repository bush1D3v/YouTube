export default function Eventos() {
    function handleClick() {
        alert("Você clicou no botão!")
    }

    return (
        <button onClick={handleClick} >
            Clique aqui
        </button>
    )
}
