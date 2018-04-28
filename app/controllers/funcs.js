const translate = require('google-translate-api');
const request = require('request');
const yql = require('yql');

module.exports.previsionWeather = function (application, req, res) {
    let body = req.body;
    let location = body['queryResult']['parameters']['location'];
    let place = "Uberlândia";

    if(location != undefined){
        if("country" in location) place = location['contry'];
        else if ("city" in location) place = location['city'];
        else if ("admin-area" in location) place = location['admin-area'];
        else if ("subadmin-area" in location) place = location['subadmin-area'];
    }

    let response = "";

    let query = new yql("select * from weather.forecast where woeid in " +
            "(select woeid from geo.places(1) where text='" + place + "')");

    query.exec(function (err, data) {
        if(data.query.results == null) {
            response = "Me desculpe, Não consegui prever o tempo para esse lugar";
            return res.json({
                'fulfillmentText' : response
            });
        }

        let far = parseFloat(data.query.results.channel.item.condition.temp);
        let cels = ((far - 32) / (1.8)).toString().split('.')[0];
        let text = data.query.results.channel.item.condition.text;

        translate(text, {to: 'pt'}).then(result => {
            let translation = result.text;
            response = "Previsão do tempo para " + place + " " + cels + " graus com tempo " + translation;

            res.json({
                'fulfillmentText' : response
            });
        }).catch(err => {
            console.error(err);
        });
    });
};

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