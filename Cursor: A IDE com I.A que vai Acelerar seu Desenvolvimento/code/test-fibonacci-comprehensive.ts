import { fibonacci, fibonacciIterative, fibonacciRecursive, fibonacciMemoized, fibonacciSequence } from './fibonacci';

function runComprehensiveTests(): void {
    console.log("=== Testes Abrangentes de Fibonacci ===");

    // Testes básicos com validação
    const basicTests = [
        { n: 0, expected: 0, description: "F(0)" },
        { n: 1, expected: 1, description: "F(1)" },
        { n: 2, expected: 1, description: "F(2)" },
        { n: 3, expected: 2, description: "F(3)" },
        { n: 4, expected: 3, description: "F(4)" },
        { n: 5, expected: 5, description: "F(5)" },
        { n: 6, expected: 8, description: "F(6)" },
        { n: 7, expected: 13, description: "F(7)" },
        { n: 8, expected: 21, description: "F(8)" },
        { n: 9, expected: 34, description: "F(9)" },
        { n: 10, expected: 55, description: "F(10)" }
    ];

    console.log("\n--- Testes Básicos ---");
    basicTests.forEach(({ n, expected, description }) => {
        try {
            const result = fibonacci(n);
            const status = result === expected ? "✅" : "❌";
            console.log(`${status} ${description} = ${result} (esperado: ${expected})`);
        } catch (error) {
            console.log(`❌ ${description}: Erro - ${error.message}`);
        }
    });

    // Comparação entre implementações
    console.log("\n--- Comparação de Implementações ---");
    const comparisonTests = [5, 8, 10, 12];
    comparisonTests.forEach(n => {
        try {
            const iterative = fibonacciIterative(n);
            const recursive = fibonacciRecursive(n);
            const memoized = fibonacciMemoized(n);
            const main = fibonacci(n);

            const allEqual = iterative === recursive && recursive === memoized && memoized === main;
            const status = allEqual ? "✅" : "❌";
            console.log(`${status} n=${n}: Iterativo=${iterative}, Recursivo=${recursive}, Memoizado=${memoized}, Principal=${main}`);
        } catch (error) {
            console.log(`❌ n=${n}: Erro - ${error.message}`);
        }
    });

    // Testes de performance
    console.log("\n--- Testes de Performance ---");
    const performanceTests = [20, 25, 30, 35];
    performanceTests.forEach(n => {
        console.log(`\nTestando F(${n}):`);

        // Iterativo
        const startIterative = Date.now();
        const resultIterative = fibonacciIterative(n);
        const timeIterative = Date.now() - startIterative;
        console.log(`  Iterativo: ${resultIterative} (${timeIterative}ms)`);

        // Memoizado
        const startMemoized = Date.now();
        const resultMemoized = fibonacciMemoized(n);
        const timeMemoized = Date.now() - startMemoized;
        console.log(`  Memoizado: ${resultMemoized} (${timeMemoized}ms)`);

        // Recursivo (apenas para números pequenos)
        if (n <= 25) {
            const startRecursive = Date.now();
            const resultRecursive = fibonacciRecursive(n);
            const timeRecursive = Date.now() - startRecursive;
            console.log(`  Recursivo: ${resultRecursive} (${timeRecursive}ms)`);

            const speedup = timeRecursive > 0 ? (timeRecursive / timeIterative).toFixed(1) : "∞";
            console.log(`  Speedup iterativo: ${speedup}x mais rápido`);
        } else {
            console.log(`  Recursivo: Pulado (muito lento para n=${n})`);
        }
    });

    // Testes de sequência
    console.log("\n--- Testes de Sequência ---");
    const sequenceTests = [5, 10, 15];
    sequenceTests.forEach(n => {
        try {
            const sequence = fibonacciSequence(n);
            console.log(`F(0) até F(${n}): [${sequence.join(', ')}]`);

            // Verificar se a sequência está correta
            let isValid = true;
            for (let i = 2; i <= n; i++) {
                if (sequence[i] !== sequence[i-1] + sequence[i-2]) {
                    isValid = false;
                    break;
                }
            }

            const status = isValid ? "✅" : "❌";
            console.log(`  ${status} Sequência válida`);
        } catch (error) {
            console.log(`❌ Sequência F(0) até F(${n}): Erro - ${error.message}`);
        }
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
            fibonacci(n);
            console.log(`❌ ${description}: Deveria ter lançado erro`);
        } catch (error) {
            console.log(`✅ ${description}: ${error.message}`);
        }
    });

    // Testes de limites
    console.log("\n--- Testes de Limites ---");
    const limitTests = [40, 45, 50];
    limitTests.forEach(n => {
        try {
            const result = fibonacci(n);
            console.log(`ℹ️  F(${n}) = ${result}`);

            // Verificar se o resultado é um número válido
            if (isFinite(result)) {
                console.log(`  ✅ Resultado finito`);
            } else {
                console.log(`  ⚠️  Resultado não finito (possível overflow)`);
            }
        } catch (error) {
            console.log(`❌ F(${n}): ${error.message}`);
        }
    });

    // Testes de memoização
    console.log("\n--- Testes de Memoização ---");
    const memoTest = 30;
    console.log(`Testando cache de memoização para F(${memoTest}):`);

    // Primeira chamada (calcula tudo)
    const startFirst = Date.now();
    const resultFirst = fibonacciMemoized(memoTest);
    const timeFirst = Date.now() - startFirst;
    console.log(`  Primeira chamada: ${resultFirst} (${timeFirst}ms)`);

    // Segunda chamada (usa cache)
    const startSecond = Date.now();
    const resultSecond = fibonacciMemoized(memoTest);
    const timeSecond = Date.now() - startSecond;
    console.log(`  Segunda chamada: ${resultSecond} (${timeSecond}ms)`);

    const cacheSpeedup = timeFirst > 0 ? (timeFirst / timeSecond).toFixed(1) : "∞";
    console.log(`  Speedup do cache: ${cacheSpeedup}x mais rápido`);

    // Testes de stress
    console.log("\n--- Testes de Stress ---");
    const stressIterations = 1000;
    const stressNumber = 20;

    console.log(`Executando ${stressIterations} cálculos de F(${stressNumber})`);
    const startStress = Date.now();

    for (let i = 0; i < stressIterations; i++) {
        fibonacci(stressNumber);
    }

    const timeStress = Date.now() - startStress;
    console.log(`⏱️  Tempo total: ${timeStress}ms`);
    console.log(`⏱️  Tempo médio por operação: ${(timeStress / stressIterations).toFixed(3)}ms`);

    // Testes de propriedades matemáticas
    console.log("\n--- Testes de Propriedades Matemáticas ---");
    const propertyTests = [5, 8, 10];
    propertyTests.forEach(n => {
        try {
            const fn = fibonacci(n);
            const fn1 = fibonacci(n + 1);
            const fn2 = fibonacci(n + 2);

            // Verificar F(n+2) = F(n+1) + F(n)
            const propertyHolds = fn2 === fn1 + fn;
            const status = propertyHolds ? "✅" : "❌";
            console.log(`${status} F(${n+2}) = F(${n+1}) + F(${n}): ${fn2} = ${fn1} + ${fn}`);
        } catch (error) {
            console.log(`❌ Propriedade para n=${n}: Erro - ${error.message}`);
        }
    });
}

if (require.main === module) {
    runComprehensiveTests();
}

