type Unpacked<T> = T extends Promise<infer U> ? U : T

// Promise<number> => number
// Promise<string> => string

type ReturnOf<F> = F extends (...args: any[]) => infer R ? R : any;

type Form<T> = { [K in keyof T]: string };

const user = {
    id: 212121212,
    name: "string",
    email: "string",
}

// Form<user> => {
//     id: number,
//     name: string,
//     email: string,
// }

type Mutable<T> = { -readonly [K in keyof T]-?: T[K] }

// Mutable<user> => {
//     readonly id:? number,
//     readonly name:? string,
//     readonly email:? string,
// }

type Getter<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type Setter<T> = {
    [K in keyof T as `set${Capitalize<string & K>}`]: () => T[K]
}

// Getter<user> => {
//     getId: number,
//     getName: string,
//     getEmail: string,
// }