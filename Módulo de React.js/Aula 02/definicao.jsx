import { useState } from 'react';

export default function Elemento() {

    const nome = "Victor";
    const [logado, setLogado] = useState(true);

    return (
        <div>
            <h1 style={{ color: 'blue', fontSize: '24px' }}>
                Olá, {nome}!
            </h1>
            <p>Seu usuário encontra-se {logado ? 'logado' : 'deslogado'}.</p>
            <button onClick={() => {
                console.log(`Antes: ${logado}`);
                setLogado(!logado)
                console.log(`Depois: ${!logado}`);
            }}>
                Clique aqui
            </button>
        </div>
    );
}

// VIRTUAL DOM
// RECONCILIATION
