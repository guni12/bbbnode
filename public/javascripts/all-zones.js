const db = require('../../db/database');
const reg = require('./status');
const one = require('./getOneZone');

module.exports = (function () {
    function getZones(req, res, next) {
        if (req.params.id) {
            one.getOne(req, res, next);
        } else {
            getAllZones(req, res, next);
        }
    }

    function getAllZones(req, res, next) {
        let sql = "SELECT * FROM zones;";

        db.all(sql,
            (err, rows) => {
                if (rows) {
                    req.zones = rows;
                    next();
                } else {
                    let obj = reg.reterror(500, "/zones", err.message);

                    return res.status(500).json(obj);
                }
            }
        );
    }


    return {
        getAllZones: getAllZones,
        getZones: getZones
    };
}());
