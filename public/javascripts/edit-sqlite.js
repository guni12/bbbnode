const reg = require('./status.js');
const db = require('../../db/database.js');

module.exports = (function () {
    function hascred(req, res, next, where) {
        if (!req.body.column || !req.body.value) {
            let obj = reg.reterror(401, where, "Kolumn eller värde saknas");

            return res.status(401).json(obj);
        }
        next();
    }


    function update(req, res, table, where) {
        let col = req.body.column;
        let val = req.body.value === "null" ? null : req.body.value;

        val = !isNaN(val) ? parseInt(val) : val;
        let id = req.body.id ? parseInt(req.body.id) : 1;
        let sql = "UPDATE " + table + " SET " + col + " = ? WHERE id = ?";
        let params = [val, id];

        db.run(sql,
            params, (err) => {
                if (err) {
                    let obj = reg.reterror(500, where, err.message);

                    return res.status(500).json(obj);
                } else {
                    let messpart = "Innehåll " + col;

                    res.status(201).json({
                        data: {
                            message: messpart + " updaterat med: " + req.body.value
                        }
                    });
                }
            });
    }

    return {
        hascred: hascred,
        update: update
    };
}());
