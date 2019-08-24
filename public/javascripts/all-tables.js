const db = require('../../db/database');
const reg = require('./status');
const one = require('./getOneRow');

module.exports = (function () {
    function getAll(req, res, next, params) {
        if (req.params.id) {
            one.getOne(req, res, next, params);
        } else {
            getAllRows(req, res, next, params);
        }
    }

    function getAllRows(req, res, next, params) {
        let sql = "SELECT * FROM " + params.table + ";";

        db.all(sql,
            (err, rows) => {
                if (rows) {
                    req[params.what] = rows;
                    next();
                } else {
                    let obj = reg.reterror(500, params.where, err.message);

                    return res.status(500).json(obj);
                }
            }
        );
    }


    return {
        getAllRows: getAllRows,
        getAll: getAll
    };
}());
