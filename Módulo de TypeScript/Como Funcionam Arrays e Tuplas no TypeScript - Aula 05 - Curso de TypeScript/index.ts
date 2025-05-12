//Arrays
const numeros: number[] = [10, 20, 30];
numeros.push(40)

const dados: (number | string)[] = [1, ""]
dados.push("10")
dados.push(10)

const valores: readonly string[] = ["A", "B"]

//Tuplas

const coordenadas: [number, number] = [10.5, 20.3]

const coordenadaOpcional: [number, number, number?] = [10.5, 20.3, 30]

function retornaPar(): [string, number] {
    return ["idade", 25];
}

const [chave, valor] = retornaPar();