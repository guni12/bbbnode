const asyn = require('../db/sqliteAsync');

async function insert(req, res, next, what) {
    let list = req[what] ? req[what] : req.content;
    let len = list.length;
    let when = list[len-1].date + " " + list[len-1].time;

    try {
        for (let i = 0; i < len-1; i++) {
            let sql = "INSERT INTO sensors (sensor, tempis, measured) VALUES ('" +
                list[i].id + "', " +
                list[i].t + ", '" +
                when +
                "');";

            await asyn.Async(sql, 'run');
        }
    } catch (err) {
        //console.log("I saveSensors", err);
        next(err);
    }
}

module.exports = {
    insert: insert
};
