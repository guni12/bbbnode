const reg = require('./status.js');

module.exports = (function () {
    function hascred(req, res, next, params) {
        //console.log("I prepare", req.body);
        if (!req.body.column || !req.body.value) {
            let obj = reg.reterror(401, params.where, params.text);

            return res.status(401).json(obj);
        }
        next();
    }


    function isundefined(req, res, next) {
        if (res.locals.user === undefined) {
            let obj = reg.reterror(401, "/login", "Detta email finns inte.");

            return res.status(401).json(obj);
        }
        next();
    }

    return {
        hascred: hascred,
        isundefined: isundefined
    };
}());
