const db = require('../../db/database.js');
const reg = require('./status.js');

module.exports = (function () {
    function getOne(req, res, next) {
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
        getOne: getOne
    };
}());
