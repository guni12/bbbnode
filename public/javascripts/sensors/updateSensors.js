const wv = require('../whenVar');
const asyn = require('../db/sqliteAsync');

async function updateSensors(req, res, next) {
    let len = req.content.length;
    let when = wv.whenVar(req.content[len-1]);

    try {
        for (let i = 0; i < len - 1; i++) {
            let sql = "UPDATE zones SET tempis = " + req.content[i].t;

            sql += ", measured = '" + when + "' WHERE sensorid = '" + req.content[i].id + "';";
            await asyn.Async(sql, 'run');
        }
        req.show = {"message": "Klart"};
    } catch (err) {
        //console.log("I updateSensors", err);
        next(err);
    }
}

module.exports = {
    updateSensors: updateSensors
};
