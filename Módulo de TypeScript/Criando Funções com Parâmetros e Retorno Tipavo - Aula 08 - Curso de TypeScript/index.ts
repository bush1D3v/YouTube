function dividir(num1: number, num2: number): number {
    return num1 / num2;
}

function mostrarMensagem(mensagem: string, usuario?: string): void {
    const destino = usuario ?? "Usuário padrão"
    console.log(`Enviando para ${destino}: ${mensagem}`);
}

function criarUsuario(nome = "Anônimo"): string {
    return `Usuário criado: ${nome}`
}

function listarItems(titulo: string, ...items: string[]): void {
    console.log(titulo);
    for (const item of items) console.log(`- ${item}`)
}

const inverter = (texto: string): string => {
    return texto.split(""). reverse(). join("")
}

console.log(inverter("TypeScript"));