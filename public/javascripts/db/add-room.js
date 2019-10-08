const asyn = require('./sqliteAsync');

async function insert(req, res, next) {
    let params = [0, 0, 0, 0, 0, `"Klicka för att hantera"`, 0];
    let cols = "(away, dsm, max, min, should, roomname, mainroom)";
    let sql = "INSERT INTO rooms " + cols + " VALUES (" + params + ");";

    try {
        await asyn.Async(sql, 'run');
        let message = "Inlagt " + params;

        res.status(201).json({
            data: {
                message: message
            }
        });
    } catch (err) {
        //console.log(err);
        next(err);
    }
}

module.exports = {
    insert: insert
};
