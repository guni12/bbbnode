const reg = require('./status');
const db = require('../../db/database');
const exv = require('./extractValue');

module.exports = (function () {
    function update(req, res, table, where) {
        let col = req.body.column;
        let val = exv.extVal(req.body.value);
        let id = req.body.id ? parseInt(req.body.id) : 1;
        let sql = "UPDATE " + table + " SET " + col + " = ? WHERE id = ?";
        let params = [val, id];

        db.run(sql,
            params, (err) => {
                if (err) {
                    let obj = reg.reterror(500, where, err.message);

                    return res.status(500).json(obj);
                } else {
                    res.status(201).json({
                        data: {
                            message: col + " updaterat med: " + req.body.value
                        }
                    });
                }
            });
    }

    return {
        update: update
    };
}());
