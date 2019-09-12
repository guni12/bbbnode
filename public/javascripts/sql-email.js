const db = require('../../db/database');
const reg = require('./status');

module.exports = (function () {
    function asksqlite(req, res, next) {
        db.get("SELECT * FROM users WHERE email = ?",
            req.body.column, (err, user) => {
                res.locals.err = err;
                res.locals.user = user;
                next();
            }
        );
    }

    function iserror(req, res, next) {
        if (res.locals.err) {
            let obj = reg.reterror(500, "/login", res.locals.err.message);

            return res.status(500).json(obj);
        }
        next();
    }

    return {
        asksqlite: asksqlite,
        iserror: iserror
    };
}());