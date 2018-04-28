module.exports.headsOrTails = function (application, req, res) {
    let body = req.body;
    let optionPerson = body['queryResult']['parameters']['ladoMoeda'];
    optionPerson = optionPerson.toLowerCase();

    let rand = Math.floor((Math.random() * 2));
    let result = (rand == 0) ? "cara" : "coroa";

    let response = "Deu " + result + "\\n ";

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