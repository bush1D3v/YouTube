import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const produtosIniciais: Produto[] = [
  { id: 1, nome: "Teclado", preco: 150 },
  { id: 2, nome: "Mouse", preco: 80 },
  { id: 3, nome: "Monitor", preco: 900 },
];

export default function Calculos() {
    const [produtos] = useState(produtosIniciais)
    const quantidade = produtos.length;

    const total = produtos.reduce((acc, produto) => acc + produto.preco, 0);

    const media = quantidade > 0 ? total / quantidade : 0;

    return (
        <div>
            <p>Quantidade de produtos: {quantidade}</p>
            <p>Total: {total}</p>
            <p>Média: {media}</p>
        </div>
    )
}
