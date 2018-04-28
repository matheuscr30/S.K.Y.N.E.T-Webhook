module.exports.hours = function (application, req, res) {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let response = "A hora atual é " + hours + " horas e " + minutes + " minutos";

    res.json({
        'fulfillmentText' : response
    });
};

module.exports.jokes = function (application, req, res) {
    let jokesList = [
        "O que o tomate foi fazer no banco? . Tirar um extrato",
        "Qual é o doce preferido do átomo? . Pé de moléculas",
        "Qual o único prato que ninguém consegue fazer direito? . A Torta",
        "O que a galinha foi fazer na Igreja? . Assistir a missa do galo",
        "O que é um pontinho amarelo na limusine? . É um milhonário",
        "O que é o que é? Dá muitas voltas e não sai do lugar . O relógio",
        "O que uma impressora falou pra outra? . Esse papel é seu ou é impressão minha",
        "Tenho uma enxada, uma pá e uma foice Quantas ferramentas eu tenho? . Duas porque uma foi se",
        "Como o Batman abre a garagem? . Ele bate palmas",
        "Nunca desista dos seus sonhos . Se acabou em uma padaria busque em outra",
        "Qual o vinho que não tem álcool? . Ovinho de codorna",
        "Qual o estado do Brasil que queria ser carro? . Sergipe",
        "O que um programador baiano falou para outro? . Ó meu arrei",
        "Qual é o som que os porcos espinhos fazem quando se beijam? . Ui",
        "O que o pagodeiro foi fazer na igreja? . Foi cantar pá godi",
        "O que aconteceu com os lápis quando souberam que o dono da faber castell morreu? . Eles ficaram desapontados",
        "A plantinha foi ao hospital, mas não foi atendida. Por quê? . Porque só tinha médico de plantão",
        "Qual foi a primeira vez que os americanos comeram carne? . Quando chegou Cristóvão com lombo",
        "Qual a fórmula química da água benta? . H deus O",
        "Qual o rei dos queijos? . o rei queijão",
        "O que o pato falou para a pata? . vem quá",
        "Sabe por que o bin laden não mata os filhos dele? . Porque ele os ama",
        "Por acaso eu tenho cara de palhaça? . Acho que não",
        "Não fui contratada para fazer piadas . Dá para me deixar em paz?"
    ]
    let rand = Math.floor((Math.random() * jokesList.length));
    let choosenJoke = jokesList[rand];

    res.json({
        'fulfillmentText' : choosenJoke
    });
};