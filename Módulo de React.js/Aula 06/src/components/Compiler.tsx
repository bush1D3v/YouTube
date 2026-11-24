import { useState } from "react";

function Compiler() {
  const [numero, setNumero] = useState(10);
  const [tema, setTema] = useState("claro");

  const resultado = numero * 2;

  function handleClick() {
    console.log("Resultado:", resultado);
  }

  return (
    <div>
      <p>Resultado: {resultado}</p>
      <p>Tema: {tema}</p>

      <button onClick={() => setNumero((n) => n + 1)}>
        Aumentar número
      </button>

      <button
        onClick={() =>
          setTema((atual) => atual === "claro" ? "escuro" : "claro")
        }
      >
        Alterar tema
      </button>

      <button onClick={handleClick}>
        Mostrar resultado
      </button>
    </div>
  );
}

export default Compiler;
