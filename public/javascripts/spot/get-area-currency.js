const reg = require('./../status.js');
const db = require('./../../../db/database.js');

module.exports = (function () {
    function asksqlite(req, res, next) {
        let sql = "SELECT area, currency FROM settings WHERE id=1";
        let params = [];

        db.get(sql,
            params, (err, row) => {
                if (row) {
                    console.log(row);
                    req.codes = row;

                    next();
                } else {
                    let obj = reg.reterror(500, "/spotcal", err.message);

                    return res.status(500).json(obj);
                }
            }
        );
    }

    return {
        asksqlite: asksqlite
    };
}());
