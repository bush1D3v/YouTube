// Sintaxe básica

type Saudacao = `hello ${"world"}`;

// Unions

type Alinhamento = `${"top" | "bottom"}-${"left" | "right"}`

type InOrOut<T> = T extends `fade${infer R}` ? R : never;

type Entry = InOrOut<"fadeIn" | "fadeOut">; // In | Out
