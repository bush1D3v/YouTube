import { useState } from "react"

export default function Texto() {
    const [nome, setNome] = useState<string>("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value)
    }

    return (
        <div>
            <input
                type="text"
                value={nome}
                onChange={handleChange}
                placeholder="Digite seu nome"
            />

            <p>Olá, {nome || "Dev"}!</p>
        </div>
    )
}
