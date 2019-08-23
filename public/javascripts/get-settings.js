const reg = require('./status.js');
const db = require('../../db/database.js');

module.exports = (function () {
    function asksqlite(req, res, next, where) {
        let sql = "SELECT * FROM settings";
        let params = [];

        db.get(sql,
            params, (err, row) => {
                if (row) {
                    req.settings = row;
                    next();
                } else {
                    let obj = reg.reterror(401, where, "Något gick fel med databasen.");

                    return res.status(401).json(obj);
                }
            }
        );
    }


    return {
        asksqlite: asksqlite
    };
}());

