const reg = require('../status');
const asyn = require('./sqliteAsync');

async function hascred(req, res, next, params) {
    if (!req.body || !req.body.gpio || !req.body.mode) {
        let obj = reg.reterror(401, params.where, params.text);

        return res.status(401).json(obj);
    }
    next();
    return undefined;
}

async function update(req, res, next) {
    let status = req.updated.status ? req.updated.status : 0;
    let sql = "UPDATE gpios SET mode = '" + req.updated.mode +
    "', status = " + status +
    " WHERE gpio = " +  req.updated.gpio + ";";

    try {
        await asyn.Async(sql, 'run');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    update: update,
    hascred: hascred
};
