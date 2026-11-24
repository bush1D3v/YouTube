import { useCallback, useState } from "react";

function Callback() {
  const [contador, setContador] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Botão clicado!");
  }, []);

  return (
    <div>
      <p>Contador: {contador}</p>

      <button onClick={() => setContador((valor) => valor + 1)}>
        Incrementar
      </button>

      <button onClick={handleClick}>
        Executar ação
      </button>
    </div>
  );
}

export default Callback;
