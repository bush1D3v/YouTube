interface SubTituloProps {
    children: React.ReactNode;
}

export function SubTitulo(props: SubTituloProps) {
    return <div className="caixa">{props.children}</div>
}
