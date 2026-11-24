import { useMemo, useState } from "react";

function Memoizacao() {
  const [numero, setNumero] = useState(10);
  const [tema, setTema] = useState("claro");

  const resultado = useMemo(() => {
    console.log("Executando cálculo...");

    return numero * 2;
  }, [numero]);

  return (
    <div>
      <p>Tema: {tema}</p>
      <p>Resultado: {resultado}</p>

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
    </div>
  );
}

export default Memoizacao;
