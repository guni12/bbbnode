const par = require('./zone-params');
const wv = require('../whenVar');
const asyn = require('../db/sqliteAsync');

async function insert(req, res, next) {
    let content = JSON.parse(req.content);
    let len = content.length-1;
    let nr = 1;
    let when = wv.whenVar(content[len]);
    let cols = "(sensorid, zone, gpio, away, dsm, tempis,";
    let message = {"message": "Klart"};

    cols += " max, min, should, name, measured)";
    try {
        for (let i = 0; i < len; i++) {
            let zone = "zone" + nr;
            let params = par.params(content, zone, when, i);
            let sql = "INSERT INTO zones " + cols + " VALUES ( " + params + " );";

            await asyn.Async(sql, 'run');
            nr += 1;
        }
        return message;
    } catch (err) {
        next(err);
        return undefined;
    }
}

module.exports = {
    insert: insert
};
