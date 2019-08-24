const reg = require('./status');
const db = require('../../db/database');

module.exports = (function () {
    function runSql(req, res, sql, params) {
        db.run(sql,
            params, (err) => {
                if (err) {
                    let obj = reg.reterror(500, "/tempupdate", err.message);

                    return res.status(500).json(obj);
                } else {
                    let part = "Uppdaterat " + params[2] + " med temp ";

                    return part + params[0] + " och tid " + params[1] + "\n";
                }
            }
        );
    }


    return {
        runSql: runSql
    };
}());
