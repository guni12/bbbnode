const db = require('../../../db/database.js');
const th = require('../throw');

async function Async(sql, how) {
    return new Promise(function (resolve, reject) {
        db[how](sql, function (err, row) {
            if (err) {
                let obj = th.throwerror(err.code, 500, "sqliteAsync", err.message);

                reject(obj);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports = {
    Async: Async
};
