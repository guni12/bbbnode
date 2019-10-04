const asyn = require('../db/sqliteAsync');

async function insert(req, res, next) {
    try {
        let len = req.printPins.length;

        for (let i = 0; i < len; i++) {
            let sql = "INSERT INTO gpios (gpio, status, mode) VALUES (" +
                req.printPins[i].gpio + ", " +
                req.printPins[i].status + ", '" +
                req.printPins[i].mode + "');";

            await asyn.Async(sql, 'run');
        }
    } catch (err) {
        //console.log("I initGpios", err);
        next(err);
    }
}

module.exports = {
    insert: insert
};
