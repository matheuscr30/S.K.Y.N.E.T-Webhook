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
        case "Tempo":
            break;
        case "CaraCoroa":
            application.controllers.funcs.headsOrTails(application, req, res);
            break;
        default:
            res.json("Nao Achou");
            break;
    }
};