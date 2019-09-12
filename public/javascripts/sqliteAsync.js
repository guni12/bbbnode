const db = require('../../db/database.js');
const reg = require('./status');

module.exports = (function () {
    async function getAsync(sql) {//console.log("Är i getAsync");
        return new Promise(function (resolve, reject) {
            db.get(sql, function (err, row) {
                if (err) {
                    let obj = reg.throwerror(err.code, 500, "sqliteAsync", err.message);

                    reject(obj);
                } else {
                    resolve(row);
                }
            });
        });
    }


    async function allAsync(sql) {//console.log("Är i allAsync");
        return new Promise(function (resolve, reject) {
            db.all(sql, function (err, row) {
                if (err) {
                    let obj = reg.throwerror(err.code, 500, "sqliteAsync", err.message);

                    reject(obj);
                } else {
                    resolve(row);
                }
            });
        });
    }


    async function runAsync(sql) {//console.log("Är i runAsync");
        return new Promise(function (resolve, reject) {
            db.run(sql, function (err, row) {
                if (err) {
                    let obj = reg.throwerror(err.code, 500, "sqliteAsync", err.message);

                    reject(obj);
                } else {
                    resolve(row);
                }
            });
        });
    }


    return {
        getAsync: getAsync,
        allAsync: allAsync,
        runAsync: runAsync
    };
}());
