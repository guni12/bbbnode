const db = require('../../db/database.js');
const reg = require('./status.js');

module.exports = (function () {
    function getAllZones(req, res, next) {
        let sql = "SELECT * FROM zones;";

        db.all(sql,
            (err, rows) => {
                if (rows) {
                    //console.log(rows);
                    //return res.json(rows);
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

        //console.log(req.body.id);
        db.get(sql,
            req.params.id, (err, row) => {
                if (row) {
                    //console.log(row);
                    //return res.json(row);
                    req.zones = row;

                    next();
                } else {
                    let message = err === null ? "Tom databas" : err.message;
                    let obj = reg.reterror(500, "/zones", message);

                    return res.status(500).json(obj);
                }
            }
        );
    }


    function show(req, res) {
        let what = req.zones;

        //console.log(what);
        return res.json(what);
    }


    return {
        getAllZones: getAllZones,
        getOneZone: getOneZone,
        show: show
    };
}());
