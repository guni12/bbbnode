const db = require('../../db/database.js');
const th = require('./throw');

module.exports = (function () {
    async function allAsync(sql) {//console.log("Är i allAsync");
        return new Promise(function (resolve, reject) {
            db.all(sql, function (err, row) {
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
        allAsync: allAsync
    };
}());
