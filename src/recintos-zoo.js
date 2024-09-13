class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        };
    }

    analisaRecintos(especie, quantidade) {
        if (!this.animais[especie]) {
            return { erro: "Animal inválido" };
        }

        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animal = this.animais[especie];
        const recintosViaveis = [];

        if (animal.carnivoro) {
            if (especie === 'CROCODILO') {
                this.adicionarRecinto(4, animal, quantidade, recintosViaveis);
            } else if (especie === 'LEAO') {
                    this.adicionarRecinto(5, animal, quantidade, recintosViaveis);
                }
        } else {
            if (especie === 'MACACO') {
                this.adicionarRecinto(1, animal, quantidade, recintosViaveis, false);
                this.adicionarRecinto(2, animal, quantidade, recintosViaveis, false);
                this.adicionarRecinto(3, animal, quantidade, recintosViaveis, true);
            } else if (especie === 'GAZELA') {
                this.adicionarRecinto(1, animal, quantidade, recintosViaveis, true);
                this.adicionarRecinto(2, animal, quantidade, recintosViaveis, false);
            }
        }

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        return recintosViaveis.length > 0 
            ? { recintosViaveis: recintosViaveis.map(r => r.descricao) }
            : { erro: "Não há recinto viável" };
    }

    adicionarRecinto(numeroRecinto, animal, quantidade, recintosViaveis, subtrairEspaco = false) {
        const recinto = this.recintos.find(r => r.numero === numeroRecinto);

        if (!recinto) return;

        let espacoOcupado = recinto.animais.reduce((soma, a) => 
            soma + (this.animais[a.especie].tamanho * a.quantidade), 0);

        if (subtrairEspaco && !recinto.animais.some(a => a.especie === animal.especie)) {
            espacoOcupado += 1;
        }

        const espacoNecessario = animal.tamanho * quantidade;
        const espacoLivre = recinto.tamanho - espacoOcupado;

        if (espacoLivre >= espacoNecessario) {
            recintosViaveis.push({
                numero: recinto.numero,
                descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanho})`
            });
        }
    }
}

export { RecintosZoo };
