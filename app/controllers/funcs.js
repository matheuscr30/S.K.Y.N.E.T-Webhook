const request = require('request');

module.exports.whatIsIt = function (application, req, res) {
    let body = req.body;
    let searchText = body['queryResult']['parameters']['searchText'];
    let response = "";

    //'https://pt.wikipedia.org/w/api.php?action=opensearch&lang=pt-br&search=' + searchText + '&limit=1&namespace=0&format=json'
    request('https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=' +
        searchText + '&exsentences=5&exintro=1&explaintext=1', {json: true}, function (err, r, body) {
        if (err) {
            response = "Me desculpe, ocorreu algum erro inesperado";
            console.log(err);
        } else {
            let pageId = Object.keys(body['query']['pages'])[0];
            let result = body['query']['pages'][pageId]['extract'];

            response = (result != '') ? result : "Não consegui encontrar nada sobre " + searchText;
        }

        res.json({
           'fulfillmentText' : response
        });
    });
};

module.exports.headsOrTails = function (application, req, res) {
    let body = req.body;
    let optionPerson = body['queryResult']['parameters']['ladoMoeda'];
    optionPerson = optionPerson.toLowerCase();

    let rand = Math.floor((Math.random() * 2));
    let result = (rand == 0) ? "cara" : "coroa";

    let response = "Deu " + result + " . ";

    if (result == optionPerson){
        let rand = Math.floor((Math.random() * global.lossResponses.length));
        response += global.lossResponses[rand];
    } else {
        let rand = Math.floor((Math.random() * global.victoryResponses.length));
        response += global.victoryResponses[rand];
    }

    res.json({
        'fulfillmentText' : response
    })
};

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
    let rand = Math.floor((Math.random() * global.jokesList.length));
    let choosenJoke = global.jokesList[rand];

    res.json({
        'fulfillmentText' : choosenJoke
    });
};