import { useState } from "react";

function App() {
  const [contador, setContador] = useState<number>(0);

  return (
    <button onClick={() => setContador(contador + 1)}>
      {contador}
    </button>
  );
}

export default App;

// Chamada da função -> React guarda valor -> enxergar atualização -> re-renderizar o componente
