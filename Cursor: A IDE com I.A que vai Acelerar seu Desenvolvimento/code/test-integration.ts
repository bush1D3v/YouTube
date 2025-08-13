import { factorial, factorialIterative, factorialRecursive } from './factorial';
import { fibonacci, fibonacciIterative, fibonacciRecursive, fibonacciMemoized, fibonacciSequence } from './fibonacci';
import { soma } from './error';

function runIntegrationTests(): void {
    console.log("=== Testes de Integração - Todas as Funcionalidades ===");

    // Teste 1: Operações básicas
    console.log("\n--- Teste 1: Operações Básicas ---");
    const basicResults = {
        soma: soma(5, 3),
        fatorial: factorial(5),
        fibonacci: fibonacci(8)
    };

    console.log(`Soma: 5 + 3 = ${basicResults.soma}`);
    console.log(`Fatorial: 5! = ${basicResults.fatorial}`);
    console.log(`Fibonacci: F(8) = ${basicResults.fibonacci}`);

    // Teste 2: Verificação de consistência
    console.log("\n--- Teste 2: Consistência entre Implementações ---");
    const testNumber = 6;

    const factorialResults = {
        iterative: factorialIterative(testNumber),
        recursive: factorialRecursive(testNumber),
        main: factorial(testNumber)
    };

    const fibonacciResults = {
        iterative: fibonacciIterative(testNumber),
        recursive: fibonacciRecursive(testNumber),
        memoized: fibonacciMemoized(testNumber),
        main: fibonacci(testNumber)
    };

    const factorialConsistent = factorialResults.iterative === factorialResults.recursive &&
                               factorialResults.recursive === factorialResults.main;

    const fibonacciConsistent = fibonacciResults.iterative === fibonacciResults.recursive &&
                               fibonacciResults.recursive === fibonacciResults.memoized &&
                               fibonacciResults.memoized === fibonacciResults.main;

    console.log(`Fatorial ${testNumber}!: Iterativo=${factorialResults.iterative}, Recursivo=${factorialResults.recursive}, Principal=${factorialResults.main} ${factorialConsistent ? '✅' : '❌'}`);
    console.log(`Fibonacci F(${testNumber}): Iterativo=${fibonacciResults.iterative}, Recursivo=${fibonacciResults.recursive}, Memoizado=${fibonacciResults.memoized}, Principal=${fibonacciResults.main} ${fibonacciConsistent ? '✅' : '❌'}`);

    // Teste 3: Sequências e padrões
    console.log("\n--- Teste 3: Sequências e Padrões ---");

    // Sequência Fibonacci
    const fibSequence = fibonacciSequence(10);
    console.log(`Sequência Fibonacci (0-10): [${fibSequence.join(', ')}]`);

    // Verificar propriedade F(n+2) = F(n+1) + F(n)
    let fibPropertyValid = true;
    for (let i = 0; i < fibSequence.length - 2; i++) {
        if (fibSequence[i + 2] !== fibSequence[i + 1] + fibSequence[i]) {
            fibPropertyValid = false;
            break;
        }
    }
    console.log(`Propriedade Fibonacci válida: ${fibPropertyValid ? '✅' : '❌'}`);

    // Teste 4: Performance comparativa
    console.log("\n--- Teste 4: Performance Comparativa ---");
    const performanceTests = [
        { name: "Soma", operation: () => soma(1000, 2000), iterations: 1000000 },
        { name: "Fatorial Iterativo", operation: () => factorialIterative(10), iterations: 10000 },
        { name: "Fatorial Recursivo", operation: () => factorialRecursive(10), iterations: 1000 },
        { name: "Fibonacci Iterativo", operation: () => fibonacciIterative(20), iterations: 10000 },
        { name: "Fibonacci Memoizado", operation: () => fibonacciMemoized(20), iterations: 10000 }
    ];

    performanceTests.forEach(test => {
        const startTime = Date.now();
        for (let i = 0; i < test.iterations; i++) {
            test.operation();
        }
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        const avgTime = totalTime / test.iterations;

        console.log(`${test.name}: ${test.iterations} operações em ${totalTime}ms (média: ${avgTime.toFixed(6)}ms)`);
    });

    // Teste 5: Casos de erro
    console.log("\n--- Teste 5: Tratamento de Erros ---");
    const errorTests = [
        { name: "Fatorial Negativo", test: () => factorial(-1) },
        { name: "Fatorial Decimal", test: () => factorial(3.5) },
        { name: "Fibonacci Negativo", test: () => fibonacci(-1) },
        { name: "Fibonacci Decimal", test: () => fibonacci(3.5) },
        { name: "Soma com NaN", test: () => soma(NaN, 5) }
    ];

    errorTests.forEach(({ name, test }) => {
        try {
            test();
            console.log(`${name}: ❌ Deveria ter lançado erro`);
        } catch (error) {
            console.log(`${name}: ✅ ${error.message}`);
        }
    });

    // Teste 6: Validação matemática
    console.log("\n--- Teste 6: Validação Matemática ---");

    // Verificar alguns valores conhecidos
    const knownValues = [
        { operation: "0!", expected: 1, actual: factorial(0) },
        { operation: "1!", expected: 1, actual: factorial(1) },
        { operation: "5!", expected: 120, actual: factorial(5) },
        { operation: "F(0)", expected: 0, actual: fibonacci(0) },
        { operation: "F(1)", expected: 1, actual: fibonacci(1) },
        { operation: "F(5)", expected: 5, actual: fibonacci(5) },
        { operation: "2+3", expected: 5, actual: soma(2, 3) }
    ];

    knownValues.forEach(({ operation, expected, actual }) => {
        const isValid = expected === actual;
        console.log(`${operation} = ${actual} (esperado: ${expected}) ${isValid ? '✅' : '❌'}`);
    });

    // Teste 7: Stress test geral
    console.log("\n--- Teste 7: Stress Test Geral ---");
    const stressOperations = 1000;
    console.log(`Executando ${stressOperations} operações de cada tipo...`);

    const startStress = Date.now();

    for (let i = 0; i < stressOperations; i++) {
        soma(i, i + 1);
        factorial(Math.min(i % 10, 5)); // Evitar números muito grandes
        fibonacci(Math.min(i % 15, 10)); // Evitar números muito grandes
    }

    const endStress = Date.now();
    const stressTime = endStress - startStress;
    console.log(`⏱️  Tempo total: ${stressTime}ms`);
    console.log(`⏱️  Operações por segundo: ${((stressOperations * 3) / (stressTime / 1000)).toFixed(0)}`);

    console.log("\n=== Testes de Integração Concluídos ===");
}

if (require.main === module) {
    runIntegrationTests();
}

