function LogClasse(construtor: Function) {
    console.log(`Classe criada: ${construtor.name}`);
}

function LogMetodo(
    alvo: any,
    nomeMetodo: string,
    descritor: PropertyDescriptor
) {
    const metodoOriginal = descritor.value;

    descritor.value = function (...args: any[]) {
        console.log(`Chamando o metodo ${nomeMetodo} com os argumentos: ${args.join(', ')}`);
        return metodoOriginal.apply(this, args);
    }
}

function minLength(tamanho: number) {
    return function(alvo: any, propriedade: string) {
        let valor = alvo[propriedade];

        const getter = () => valor;
        const setter = (novoValor: string) => {
            if (novoValor.length < tamanho) {
                console.error(`O tamanho do valor deve ser pelo menos ${tamanho} caracteres.`);
            } else {
                valor = novoValor;
            }
        }

        Object.defineProperty(alvo, propriedade, {
            get: getter,
            set: setter,
        });
    }
}

function Log(tag: string) {
    return function (alvo: any, nome: string, descritor: PropertyDescriptor) {
        const original = descritor.value;
        descritor.value = function (...args: any[]) {
            console.log(`[${tag}] Chamando ${nome} com argumentos: ${args.join(', ')}`);
            return original.apply(this, args);
        }
    }
}

@LogClasse
class Produto {
    @minLength(5)
    nome: string;

    constructor(nome:string) {
        this.nome = nome;
    }

    @LogMetodo
    zerarEstoque(id: number) {
        console.log(`Zerando o estodue do produto ${this.nome} com ID: ${id}`);
    }

    @Log('adicionarProduto')
    adicionar(produto: string){
        console.log(`Adicionando o produto: ${produto}`);
    }
}

const produto = new Produto('Geladeira');
console.log(produto);