import { factorial, factorialIterative, factorialRecursive } from './factorial';

function runComprehensiveTests(): void {
    console.log("=== Testes Abrangentes de Fatorial ===");

    // Testes básicos com validação
    const basicTests = [
        { n: 0, expected: 1, description: "0!" },
        { n: 1, expected: 1, description: "1!" },
        { n: 2, expected: 2, description: "2!" },
        { n: 3, expected: 6, description: "3!" },
        { n: 4, expected: 24, description: "4!" },
        { n: 5, expected: 120, description: "5!" },
        { n: 10, expected: 3628800, description: "10!" }
    ];

    console.log("\n--- Testes Básicos ---");
    basicTests.forEach(({ n, expected, description }) => {
        try {
            const result = factorial(n);
            const status = result === expected ? "✅" : "❌";
            console.log(`${status} ${description} = ${result} (esperado: ${expected})`);
        } catch (error) {
            console.log(`❌ ${description}: Erro - ${error.message}`);
        }
    });

    // Comparação entre implementações
    console.log("\n--- Comparação de Implementações ---");
    const comparisonTests = [5, 8, 10];
    comparisonTests.forEach(n => {
        try {
            const iterative = factorialIterative(n);
            const recursive = factorialRecursive(n);
            const main = factorial(n);

            const allEqual = iterative === recursive && recursive === main;
            const status = allEqual ? "✅" : "❌";
            console.log(`${status} n=${n}: Iterativo=${iterative}, Recursivo=${recursive}, Principal=${main}`);
        } catch (error) {
            console.log(`❌ n=${n}: Erro - ${error.message}`);
        }
    });

    // Testes de performance
    console.log("\n--- Testes de Performance ---");
    const performanceTests = [10, 15, 20];
    performanceTests.forEach(n => {
        console.log(`\nTestando n=${n}:`);

        // Iterativo
        const startIterative = Date.now();
        const resultIterative = factorialIterative(n);
        const timeIterative = Date.now() - startIterative;
        console.log(`  Iterativo: ${resultIterative} (${timeIterative}ms)`);

        // Recursivo
        const startRecursive = Date.now();
        const resultRecursive = factorialRecursive(n);
        const timeRecursive = Date.now() - startRecursive;
        console.log(`  Recursivo: ${resultRecursive} (${timeRecursive}ms)`);

        // Comparação
        const speedup = timeRecursive > 0 ? (timeRecursive / timeIterative).toFixed(1) : "∞";
        console.log(`  Speedup iterativo: ${speedup}x mais rápido`);
    });

    // Testes de casos de erro
    console.log("\n--- Testes de Casos de Erro ---");
    const errorCases = [
        { n: -1, description: "Número negativo" },
        { n: -5, description: "Número negativo grande" },
        { n: 3.5, description: "Número decimal" },
        { n: 2.7, description: "Número decimal" },
        { n: NaN, description: "NaN" },
        { n: Infinity, description: "Infinity" },
        { n: -Infinity, description: "-Infinity" }
    ];

    errorCases.forEach(({ n, description }) => {
        try {
            factorial(n);
            console.log(`❌ ${description}: Deveria ter lançado erro`);
        } catch (error) {
            console.log(`✅ ${description}: ${error.message}`);
        }
    });

    // Testes de limites
    console.log("\n--- Testes de Limites ---");
    const limitTests = [21, 22, 23];
    limitTests.forEach(n => {
        try {
            const result = factorial(n);
            console.log(`ℹ️  ${n}! = ${result}`);

            // Verificar se o resultado é um número válido
            if (isFinite(result)) {
                console.log(`  ✅ Resultado finito`);
            } else {
                console.log(`  ⚠️  Resultado não finito (possível overflow)`);
            }
        } catch (error) {
            console.log(`❌ ${n}!: ${error.message}`);
        }
    });

    // Testes de stress
    console.log("\n--- Testes de Stress ---");
    const stressIterations = 1000;
    const stressNumber = 10;

    console.log(`Executando ${stressIterations} cálculos de ${stressNumber}!`);
    const startStress = Date.now();

    for (let i = 0; i < stressIterations; i++) {
        factorial(stressNumber);
    }

    const timeStress = Date.now() - startStress;
    console.log(`⏱️  Tempo total: ${timeStress}ms`);
    console.log(`⏱️  Tempo médio por operação: ${(timeStress / stressIterations).toFixed(3)}ms`);
}

if (require.main === module) {
    runComprehensiveTests();
}

