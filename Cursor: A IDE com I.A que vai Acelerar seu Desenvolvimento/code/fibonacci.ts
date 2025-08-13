function fibonacciIterative(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Fibonacci só é definido para números inteiros não-negativos");
    }

    if (n <= 1) return n;

    let prev = 0;
    let current = 1;

    for (let i = 2; i <= n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }

    return current;
}

function fibonacciRecursive(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Fibonacci só é definido para números inteiros não-negativos");
    }

    if (n <= 1) return n;

    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

function fibonacciMemoized(n: number, memo: Map<number, number> = new Map()): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Fibonacci só é definido para números inteiros não-negativos");
    }

    if (n <= 1) return n;

    if (memo.has(n)) {
        return memo.get(n)!;
    }

    const result = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    memo.set(n, result);

    return result;
}

function fibonacci(n: number, useRecursive: boolean = false, useMemoization: boolean = false): number {
    if (useMemoization) {
        return fibonacciMemoized(n);
    }
    return useRecursive ? fibonacciRecursive(n) : fibonacciIterative(n);
}

function fibonacciSequence(n: number): number[] {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Sequência Fibonacci só é definida para números inteiros não-negativos");
    }

    const sequence: number[] = [];

    for (let i = 0; i <= n; i++) {
        sequence.push(fibonacci(i));
    }

    return sequence;
}

export { fibonacci, fibonacciIterative, fibonacciRecursive, fibonacciMemoized, fibonacciSequence };
