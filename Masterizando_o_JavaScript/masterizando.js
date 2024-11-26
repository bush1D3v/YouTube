// @ts-check

/**
 * @description Soma dos números
 * @param {number} n1
 * @param {number} n2
 * @returns number
 */
function sum(n1, n2) {
    return n1 + n2;
}

// @ts-expect-error
console.log(sum(1, "2"));

/**
 * @type {number}
 */
let num = 1;

// @ts-ignore
num = "0";

/**
 * @type {{a: number, b: string}}
 */
const obj = { a: 1, b: "2" };
