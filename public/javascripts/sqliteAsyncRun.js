const db = require('../../db/database.js');
const th = require('./throw');

module.exports = (function () {
    async function runAsync(sql) {//console.log("Är i runAsync");
        return new Promise(function (resolve, reject) {
            db.run(sql, function (err, row) {
                if (err) {
                    let obj = th.throwerror(err.code, 500, "sqliteAsync", err.message);

                    reject(obj);
                } else {
                    resolve(row);
                }
            });
        });
    }


    return {
        runAsync: runAsync
    };
}());
