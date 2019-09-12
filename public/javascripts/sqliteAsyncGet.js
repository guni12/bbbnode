const db = require('../../db/database.js');
const th = require('./throw');

module.exports = (function () {
    async function getAsync(sql) {//console.log("Är i getAsync");
        return new Promise(function (resolve, reject) {
            db.get(sql, function (err, row) {
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
        getAsync: getAsync
    };
}());
