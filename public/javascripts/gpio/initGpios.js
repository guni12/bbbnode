const asyn = require('../db/sqliteAsync');
const th = require('../throw');

async function insert(req, res, next) {
    try {
        if (req.printPins) {
            let len = req.printPins.length;

            for (let i = 0; i < len; i++) {
                let sql = "INSERT INTO gpios (gpio, status, mode) VALUES (" +
                    req.printPins[i].gpio + ", " +
                    req.printPins[i].status + ", '" +
                    req.printPins[i].mode + "');";

                await asyn.Async(sql, 'run');
            }
        } else {
            let text = "req.printPins saknas";
            let obj = th.throwerror("Error", 500, "initGpios", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        //console.log("I initGpios", err);
        next(err);
    }
}

module.exports = {
    insert: insert
};
