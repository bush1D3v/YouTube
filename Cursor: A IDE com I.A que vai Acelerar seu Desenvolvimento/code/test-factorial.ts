import { factorial, factorialIterative, factorialRecursive } from './factorial';

function runTests(): void {
    const testCases = [0, 1, 5, 10, 15];

    console.log("Testando função fatorial:");
    testCases.forEach(n => {
        try {
            const result = factorial(n);
            console.log(`${n}! = ${result}`);
        } catch (error) {
            console.error(`Erro: ${error.message}`);
        }
    });

    console.log("\nComparando implementações:");
    const testNum = 8;
    console.log(`Iterativo: ${factorialIterative(testNum)}`);
    console.log(`Recursivo: ${factorialRecursive(testNum)}`);

    console.log("\nTestando casos de erro:");
    [-1, 3.5, -2.7].forEach(n => {
        try {
            factorial(n);
        } catch (error) {
            console.log(`${n}: ${error.message}`);
        }
    });
}

if (require.main === module) {
    runTests();
}
