const db = require('../../db/database.js');
const reg = require('./status.js');

module.exports = (function () {
    function getOne(req, res, next, params) {
        let id = params.table === 'settings' ? 1 : parseInt(req.params.id);
        let sql = "SELECT * FROM " + params.table + " WHERE id = ?;";

        db.get(sql,
            id, (err, row) => {
                if (row) {
                    req[params.what] = row;

                    next();
                } else {
                    let message = err === null ? "Detta id finns inte" : err.message;
                    let obj = reg.reterror(500, params.where, message, id);

                    return res.status(500).json(obj);
                }
            }
        );
    }


    return {
        getOne: getOne
    };
}());
