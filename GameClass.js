class Heroi {
    constructor(nome, idade, tipo) {
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo.toLowerCase(); // Garante que o tipo seja sempre minúsculo
    }

    atacar() {
        const tiposValidos = ["mago", "guerreiro", "monge", "ninja"];

        if (!tiposValidos.includes(this.tipo)) {
            console.log("Tipo de herói inválido. Escolha entre: mago, guerreiro, monge, ninja.");
            return;
        }

        const ataques = {
            mago: "usou magia",
            guerreiro: "usou espada",
            monge: "usou artes marciais",
            ninja: "usou shuriken",
        };

        const ataque = ataques[this.tipo];
        const mensagem = `O ${this.tipo} ${this.nome} atacou usando ${ataque}`;
        console.log(mensagem);
    }
}

// Exemplo de uso:
const heroiMago = new Heroi("Merlin", 100, "mago");
const heroiGuerreiro = new Heroi("Conan", 30, "guerreiro");
const heroiMonge = new Heroi("Bruce", 45, "monge");
const heroiNinja = new Heroi("Hanzo", 28, "ninja");

heroiMago.atacar();
heroiGuerreiro.atacar();
heroiMonge.atacar();
heroiNinja.atacar();
