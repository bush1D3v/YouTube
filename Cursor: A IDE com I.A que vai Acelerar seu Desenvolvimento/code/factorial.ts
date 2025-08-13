function factorialIterative(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Fatorial só é definido para números inteiros não-negativos");
    }

    if (n <= 1) return 1;

    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

function factorialRecursive(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Fatorial só é definido para números inteiros não-negativos");
    }

    if (n <= 1) return 1;

    return n * factorialRecursive(n - 1);
}

function factorial(n: number, useRecursive: boolean = false): number {
    return useRecursive ? factorialRecursive(n) : factorialIterative(n);
}

export { factorial, factorialIterative, factorialRecursive };
