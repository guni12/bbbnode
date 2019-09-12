const par = require('./zone-params');
const wv = require('./whenVar');
const as = require('./sqliteAsync');

module.exports = (function () {
    async function insert(req, res, next) {
        let content = JSON.parse(req.content);
        let len = content.length;
        let nr = 1;
        let when = wv.whenVar(content[len-1]);
        let cols = "(sensorid, zone, gpio, away, dsm, tempis,";

        cols += " max, min, should, name, measured)";//console.log(typeof(content), content, when);

        try {
            for (let i = 0; i < len - 1; i++) {
                let zone = "zone" + nr;
                let params = par.params(content, zone, when, i);
                let sql = "INSERT INTO zones " + cols + " VALUES ( " + params + " );";

                await as.runAsync(sql);
                nr += 1;
            }
            return {"message": "Klart"};
        } catch (err) {
            next(err);
        }
    }

    return {
        insert: insert
    };
}());


