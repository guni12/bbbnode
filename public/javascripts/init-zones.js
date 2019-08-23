const db = require('../../db/database.js');

module.exports = (function () {
    function check(req, res, next) {
        let sql = "SELECT * FROM zones";

        db.get(sql,
            (err, row) => {
                if (row) {
                    let message = {"message": "Redan initierat"};

                    res.json(message);
                } else {
                    console.log(err);
                    next();
                }
            }
        );
    }


    return {
        check: check
    };
}());

