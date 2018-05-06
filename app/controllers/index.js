module.exports.conversation = function (application, req, res) {
    let body = req.body;
    let intent = body['queryResult']['intent']['displayName'];

    switch (intent){
        case "games.jokes":
            application.controllers.funcs.jokes(application, req, res);
            break;
        case "time.hours":
            application.controllers.funcs.hours(application, req, res);
            break;
        case "games.headOrTails":
            application.controllers.funcs.headsOrTails(application, req, res);
            break;
        case "information.whatIsIt":
            application.controllers.funcs.whatIsIt(application, req, res);
            break;
        case "time.wheather":
            application.controllers.funcs.weather(application, req, res);
            break;
        case "music.yes":
        case "music.artist":
        case "music.genre":
        case "music.name":
            application.controllers.funcs.playMusic(application, req, res);
            break;
        default:
            res.json({
                'fulfillmentText': 'Não consegui processar o que você quer'
            });
            break;
    }
};
