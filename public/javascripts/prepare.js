const reg = require('./status.js');

module.exports = (function () {
    function hascred(req, res, next, params) {
        //if (!req.body.email || !req.body.password) {
        if (!req.body.column || !req.body.value) {
            let obj = reg.reterror(401, params.where, params.text);

            return res.status(401).json(obj);
        }
        next();
    }


    function isundefined(req, res, next) {
        if (res.locals.user === undefined) {
            let obj = reg.reterror(401, "/login", "User with provided email not found.");

            return res.status(401).json(obj);
        }
        next();
    }

    return {
        hascred: hascred,
        isundefined: isundefined
    };
}());
