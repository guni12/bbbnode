const reg = require('./status.js');
const db = require('../../db/database.js');

module.exports = (function () {
    function insert(req, res) {
        //let params = JSON.parse(req.body.data);
        let params = JSON.parse(req.body.value);
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
        insert: insert
    };
}());
