function App() {
  let contador = 0;

  return (
    <button onClick={() => contador++}>
      {contador}
    </button>
  );
}
