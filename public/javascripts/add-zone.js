const as = require('./sqliteAsync');

module.exports = (function () {
    async function insert(req, res, next) {
        try {
            let params = JSON.parse(req.body.value);
            let cols = "(sensorid, zone, away, dsm, tempis,";

            cols += " max, min, should, name, measured)";
            let sql = "INSERT INTO zones " + cols + " VALUES (" + params + ");";

            try {
                await as.runAsync(sql);
                let message = "Inlagt " + params;

                res.status(201).json({
                    data: {
                        message: message
                    }
                });
            } catch (err) {
                next(err);
            }
        } catch (err) {
            next(err);
        }
    }

    return {
        insert: insert
    };
}());
