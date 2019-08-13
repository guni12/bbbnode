const reg = require('./status.js');
const db = require('../../db/database.js');

module.exports = (function () {
    function hascred(req, res, next) {
        if (!req.body.data) {
            let obj = reg.reterror(401, '/addzone', "Data saknas");

            return res.status(401).json(obj);
        }
        next();
    }

    function insert(req, res) {
        let params = JSON.parse(req.body.data);
        let cols = "(sensorid, zone, gpio, away, dsm, tempis, isoff, ison,";

        cols += " max, min, should, name, measured)";
        let sql = "INSERT INTO zones " + cols + " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

        db.run(sql,
            params, (err) => {
                if (err) {
                    let obj = reg.reterror(500, "/addzone", err.message, params);

                    return res.status(500).json(obj);
                } else {
                    let message = "Inlagt " + params;

                    res.status(201).json({
                        data: {
                            message: message
                        }
                    });
                }
            });
    }

    return {
        hascred: hascred,
        insert: insert
    };
}());
