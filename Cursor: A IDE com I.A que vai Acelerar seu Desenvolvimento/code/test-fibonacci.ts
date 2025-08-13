import { fibonacci, fibonacciIterative, fibonacciRecursive, fibonacciMemoized, fibonacciSequence } from './fibonacci';

function runTests(): void {
    const testCases = [0, 1, 5, 10, 15, 20];

    console.log("Testando função Fibonacci:");
    testCases.forEach(n => {
        try {
            const result = fibonacci(n);
            console.log(`F(${n}) = ${result}`);
        } catch (error) {
            console.error(`Erro: ${error.message}`);
        }
    });

    console.log("\nComparando implementações:");
    const testNum = 12;
    console.log(`Iterativo F(${testNum}): ${fibonacciIterative(testNum)}`);
    console.log(`Recursivo F(${testNum}): ${fibonacciRecursive(testNum)}`);
    console.log(`Memoizado F(${testNum}): ${fibonacciMemoized(testNum)}`);

    console.log("\nSequência Fibonacci (0-10):");
    try {
        const sequence = fibonacciSequence(10);
        console.log(sequence.join(', '));
    } catch (error) {
        console.error(`Erro: ${error.message}`);
    }

    console.log("\nPerformance - Fibonacci(30):");
    const startTime = Date.now();
    const result = fibonacci(30, false, true);
    const endTime = Date.now();
    console.log(`F(30) = ${result} (${endTime - startTime}ms com memoização)`);

    console.log("\nTestando casos de erro:");
    [-1, 3.5, -2.7].forEach(n => {
        try {
            fibonacci(n);
        } catch (error) {
            console.log(`${n}: ${error.message}`);
        }
    });
}

if (require.main === module) {
    runTests();
}
