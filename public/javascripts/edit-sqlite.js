const reg = require('./status');
const db = require('../../db/database');

module.exports = (function () {
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
        update: update
    };
}());
