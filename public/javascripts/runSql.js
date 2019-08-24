const reg = require('./status');
const db = require('../../db/database');

module.exports = (function () {
    function runSql(req, res, sql, params) {
        db.run(sql,
            params.par, (err) => {
                if (err) {
                    let obj = reg.reterror(500, params.where, err.message);

                    return res.status(500).json(obj);
                }
                let text = params.par.join(', ') + "\n";

                req.content = text;
                return text;
            }
        );
    }


    return {
        runSql: runSql
    };
}());
