class Usuario {
    constructor(public nome: string, public email: string) {
        this.nome = nome;
        this.email = email;
    }

    exibirPerfil() {
        console.log(`Usuário: ${this.nome}, Email: ${this.email}`);
    }
}

class Admin extends Usuario {
    constructor(nome: string, email: string, public permissoes: string[]) {
        super(nome, email);
    }

    exibirPermissao() {
        console.log(`Permissões: ${this.permissoes}`);
    }
}

interface Exportavel {
    exportar: () => string;
}

interface Imprimivel{
    imprimir: () => void;
}

abstract class Relatorio implements Exportavel, Imprimivel {
    constructor(public name: string, public conteudo: string) {
        this.name = name;
        this.conteudo = conteudo;
    }

    exportar() {
        return this.name;
    }

    imprimir() {
        console.log(`Relatório Mensal: ${this.conteudo}`);
    }
}

class RelatorioMensal extends Relatorio {
    constructor(public name: string, public conteudo: string, public mes: string) {
       super(name, conteudo);
    }

    getMes() {
        return this.mes;
    }

    setMes(mes: string) {
        this.mes = mes;
    }
}