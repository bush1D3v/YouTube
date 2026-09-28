import { Titulo } from "./components/Titulo";
import { SubTitulo } from "./components/Subtitulo";

export function App() {
    return (
        <div>
            <Titulo texto="Título padrão" />
            <Titulo />
            <Titulo texto="Número 2" />
            <SubTitulo>
                <div>
                    Teste
                </div>
            </SubTitulo>
        </div>
    )
}
