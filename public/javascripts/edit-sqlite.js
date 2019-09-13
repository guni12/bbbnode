const reg = require('./status');
const db = require('../../db/database');
const exv = require('./extractValue');

function update(req, res, next, par) {
    let col = req.body.column;
    let val = exv.extVal(req.body.value);
    let id = req.body.id ? parseInt(req.body.id) : 1;
    let sql = "UPDATE " + par.table + " SET " + col + " = ? WHERE id = ?";
    let params = [val, id];
    let message = {"message": ""};

    db.run(sql,
        params, (err) => {
            if (err) {
                let obj = reg.reterror(500, par.where, err.message);

                return res.status(500).json(obj);
            } else {
                message.message = col + " updaterat med: " + val;
                req.content = message;
                next();
            }
        });
}

module.exports = {
    update: update
};
