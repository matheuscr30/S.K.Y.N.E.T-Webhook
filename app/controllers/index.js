module.exports.conversation = function (application, req, res) {
    let body = req.body;
    let intent = body['queryResult']['intent']['displayName'];

    switch (intent){
        case "Piadas":
            application.controllers.funcs.jokes(application, req, res);
            break;
        default:
            break;
    }
};