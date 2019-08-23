const reg = require('./status');
const db = require('../../db/database');
const par = require('./zone-params');

module.exports = (function () {
    function insert(req, res) {
        let list = req.content;
        let nr = 1;

        let time = list[list.length - 1].time;
        let date = list[list.length - 1].date;
        let when = date + " " + time;
        let message = {"message": "Klart"};
        let cols = "(sensorid, zone, gpio, away, dsm, tempis, isoff, ison,";

        cols += " max, min, should, name, measured)";

        let sql = "INSERT INTO zones " + cols + " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

        for (let i = 0; i < list.length - 1; i++) {
            let zone = "zone" + nr;
            let params = par.params(list, zone, when, i);

            db.run(sql,
                params, (err) => {
                    if (err) {
                        let obj = reg.reterror(500, "/addzone", err.message);

                        return res.status(500).json(obj);
                    } else {
                        message.message = zone + ", " + list[i].id + " och " + list[i].t + "\n";
                    }
                }
            );
            nr += 1;
        }
        res.json(message);
    }

    return {
        insert: insert
    };
}());

