interface TituloProps {
    texto?: string;
}

export function Titulo({ texto = "Título padrão" }: TituloProps) {
    return <h1>{texto}</h1>
}
