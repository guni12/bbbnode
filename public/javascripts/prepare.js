const reg = require('./status.js');

async function hascred(req, res, next, params) {
    //console.log("I prepare", req.body);
    if (!req.body.column || !req.body.value) {
        let obj = reg.reterror(401, params.where, params.text);

        return res.status(401).json(obj);
    }
    next();
    return undefined;
}


async function isundefined(req, res, next) {
    if (res.locals.user === undefined) {
        let obj = reg.reterror(401, "/login", "Detta email finns inte.");

        return res.status(401).json(obj);
    }
    next();
    return undefined;
}

module.exports = {
    hascred: hascred,
    isundefined: isundefined
};
