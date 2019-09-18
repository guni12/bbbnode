const asyn = require('./sqliteAsync');

async function insert(req, res, next) {
    let params = JSON.parse(req.body.value);
    let cols = "(sensorid, zone, away, dsm, tempis,";

    cols += " max, min, should, name, measured)";
    let sql = "INSERT INTO zones " + cols + " VALUES (" + params + ");";

    try {
        await asyn.Async(sql, 'run');
        let message = "Inlagt " + params;

        res.status(201).json({
            data: {
                message: message
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    insert: insert
};