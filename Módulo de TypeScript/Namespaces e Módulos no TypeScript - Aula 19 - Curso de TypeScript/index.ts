import { somar } from "./utils";

async function exibirSoma(a: number, b: number): Promise<void> {
    const somar = await import("./math");
    console.log(`${a} + ${b} = `, somar.default(a, b));
}

const input = "10";

if (typeof input === "string") {
    // outra funcionalidade
} else if (typeof input === "number") {
    exibirSoma(input, input)
}