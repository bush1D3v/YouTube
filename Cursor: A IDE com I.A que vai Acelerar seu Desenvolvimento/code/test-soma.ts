import { soma } from './error';

function runTests(): void {
    console.log("=== Testando Função Soma ===");

    // Testes básicos
    const basicTests = [
        { a: 0, b: 0, expected: 0 },
        { a: 1, b: 1, expected: 2 },
        { a: 5, b: 3, expected: 8 },
        { a: -1, b: 1, expected: 0 },
        { a: -5, b: -3, expected: -8 },
        { a: 100, b: 200, expected: 300 }
    ];

    basicTests.forEach(({ a, b, expected }) => {
        const result = soma(a, b);
        const status = result === expected ? "✅" : "❌";
        console.log(`${status} ${a} + ${b} = ${result} (esperado: ${expected})`);
    });

    // Testes com números decimais
    console.log("\n=== Testes com Decimais ===");
    const decimalTests = [
        { a: 1.5, b: 2.5, expected: 4 },
        { a: 0.1, b: 0.2, expected: 0.3 },
        { a: -1.5, b: 1.5, expected: 0 },
        { a: 3.14, b: 2.86, expected: 6 }
    ];

    decimalTests.forEach(({ a, b, expected }) => {
        const result = soma(a, b);
        const status = Math.abs(result - expected) < 0.01 ? "✅" : "❌";
        console.log(`${status} ${a} + ${b} = ${result} (esperado: ${expected})`);
    });

    // Testes de edge cases
    console.log("\n=== Edge Cases ===");
    const edgeTests = [
        { a: Number.MAX_SAFE_INTEGER, b: 1, description: "Max safe integer + 1" },
        { a: Number.MIN_SAFE_INTEGER, b: -1, description: "Min safe integer - 1" },
        { a: Infinity, b: 1, description: "Infinity + 1" },
        { a: -Infinity, b: 1, description: "-Infinity + 1" },
        { a: NaN, b: 1, description: "NaN + 1" }
    ];

    edgeTests.forEach(({ a, b, description }) => {
        try {
            const result = soma(a, b);
            console.log(`ℹ️  ${description}: ${a} + ${b} = ${result}`);
        } catch (error) {
            console.log(`⚠️  ${description}: Erro - ${error.message}`);
        }
    });

    // Testes de performance
    console.log("\n=== Teste de Performance ===");
    const iterations = 1000000;
    const startTime = Date.now();

    for (let i = 0; i < iterations; i++) {
        soma(i, i + 1);
    }

    const endTime = Date.now();
    console.log(`⏱️  ${iterations} operações em ${endTime - startTime}ms`);
}

if (require.main === module) {
    runTests();
}

