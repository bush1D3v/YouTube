class Produto {
    private _nome: string;
    private _preco: number;

    constructor(nome: string, preco: number) {
        this._nome = nome;
        this._preco = preco;
    }

    getNome() {
        return this._nome;
    }

    setNome(nome: string) {
        this._nome = nome;
    }

    getPreco() {
        return this._preco;
    }

    setPreco(preco: number) {
        this._preco = preco;
    }
}

const PlacaDeVideo = new Produto("RTX 4090", 6000);

class ProdutoFixo {
    _nome: string;
    private _preco: number;

    constructor(readonly nome: string, preco: number) {
        this._nome = nome;
        this._preco = preco;
    }

    getPreco() {
        return this._preco;
    }

    setPreco(preco: number) {
        this._preco = preco;
    }
}

const PlacaMae = new ProdutoFixo("RTX 4090", 6000);

class ProdutoComEstoque {
    private nome: string;
    private _preco: number;
    private estoque: number;

    constructor(nome: string, preco: number, estoque: number) {
        this.nome = nome;
        this._preco = preco;
        this.estoque = estoque;
    }

    getPreco() {
        return this._preco;
    }

    getNome() {
        return this.nome;
    }

    setPreco(preco: number) {
        this._preco = preco;
    }

    static zerarEstoque() {
        console.log(`O produto ${ProdutoComEstoque.name} está zerado!!!!`);
    }
}
