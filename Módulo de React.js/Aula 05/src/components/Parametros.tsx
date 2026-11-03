function Parametros() {
  function handleDelete(id: number) {
    alert(`Excluindo produto ${id}`);
  }

  return (
    <div>
      <button onClick={() => handleDelete(1)}>
        Excluir produto 1
      </button>

      <button onClick={() => handleDelete(2)}>
        Excluir produto 2
      </button>
    </div>
  );
}

export default Parametros;
