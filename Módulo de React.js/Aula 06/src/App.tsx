import { useState } from 'react';

export default function App() {
	const [cliques, setCliques] = useState(0);

	return (
		<main style={{ fontFamily: 'sans-serif', margin: '3rem auto', maxWidth: 480, textAlign: 'center' }}>
			<h1>Olá, mundo! 👋</h1>
			<p>Você clicou no botão {cliques} vezes.</p>
			<button onClick={() => setCliques((total) => total + 1)}>
				Clique aqui
			</button>
		</main>
	);
}
