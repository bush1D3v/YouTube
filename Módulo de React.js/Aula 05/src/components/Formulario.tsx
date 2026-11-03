function Formulario() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("Formulário enviado!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite seu nome"
      />

      <button type="submit">
        Enviar
      </button>
    </form>
  );
}

export default Formulario;
