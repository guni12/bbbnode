const reg = require('./status');
const db = require('../../db/database');
const par = require('./zone-params');
const wv = require('./whenVar');

module.exports = (function () {
    function insert(req, res) {
        let len = req.content.length;
        let nr = 1;
        let when = wv.whenVar(req.content[len-1]);
        let cols = "(sensorid, zone, gpio, away, dsm, tempis, isoff, ison,";

        cols += " max, min, should, name, measured)";

        let sql = "INSERT INTO zones " + cols + " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

        for (let i = 0; i < len - 1; i++) {
            let zone = "zone" + nr;
            let params = par.params(req.content, zone, when, i);

            db.run(sql,
                params, (err) => {
                    if (err) {
                        let obj = reg.reterror(500, "/addzone", err.message);

                        return res.status(500).json(obj);
                    }
                }
            );
            nr += 1;
        }
        res.json({"message": "Klart"});
    }

    return {
        insert: insert
    };
}());

