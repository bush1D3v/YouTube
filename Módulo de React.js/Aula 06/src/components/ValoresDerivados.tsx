interface Produto {
  id: number;
  nome: string;
  preco: number;
}

// const produtos: Produto[] = [
//   { id: 1, nome: "Teclado", preco: 150 },
//   { id: 2, nome: "Mouse", preco: 80 },
//   { id: 3, nome: "Monitor", preco: 900 },
// ];

export default function ValoresDerivados(produtos: Produto[]) {
    const quantidade = produtos.length;

    return (
        <div>
            <p>Quantidade de produtos: {quantidade}</p>
        </div>
    )
}
