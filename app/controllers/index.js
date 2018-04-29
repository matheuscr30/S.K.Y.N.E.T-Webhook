module.exports.conversation = function (application, req, res) {
    let body = req.body;
    let intent = body['queryResult']['intent']['displayName'];

    switch (intent){
        case "Piadas":
            application.controllers.funcs.jokes(application, req, res);
            break;
        case "Horas":
            application.controllers.funcs.hours(application, req, res);
            break;
        case "CaraCoroa":
            application.controllers.funcs.headsOrTails(application, req, res);
            break;
        case "OQueE":
            application.controllers.funcs.whatIsIt(application, req, res);
            break;
        case "Tempo":
            application.controllers.funcs.previsionWeather(application, req, res);
            break;
        case "TocarMusica.sim":
        case "TocarMusica.nao":
        case "TocarMusica.artista":
        case "TocarMusica.genero":
        case "TocarMusica.nome":
            application.controllers.funcs.playMusic(application, req, res);
            break;
        default:
            res.json("Nao Achou");
            break;
    }
};