const db = require('../../db/database.js');
const reg = require('./status.js');

module.exports = (function () {
    function getZones(req, res, next) {
        if (req.params.id) {
            getOneZone(req, res, next);
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


    function getOneZone(req, res, next) {
        let sql = "SELECT * FROM zones WHERE id = ?";

        db.get(sql,
            req.params.id, (err, row) => {
                if (row) {
                    req.zones = row;

                    next();
                } else {
                    let message = err === null ? "Detta id finns inte" : err.message;
                    let obj = reg.reterror(500, "/zones", message);

                    return res.status(500).json(obj);
                }
            }
        );
    }


    return {
        getAllZones: getAllZones,
        getOneZone: getOneZone,
        getZones: getZones
    };
}());
