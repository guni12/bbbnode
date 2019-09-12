const one = require('./getOneRow');
const asyn = require('./sqliteAsync');

module.exports = (function () {
    async function getAll(req, res, next, params) {
        try {
            if (req.params.id) {
                await one.getOne(req, res, next, params);
            } else {
                await getAllRows(req, res, next, params);
            }
        } catch (err) {
            next(err);
        }
    }

    async function getAllRows(req, res, next, params) {
        let sql = "SELECT * FROM " + params.table + ";";

        await asyn.allAsync(sql)
            .then((data) => {
                req[params.what] = data;
            })
            .catch(er => {
                next(er);
            });
    }


    return {
        getAllRows: getAllRows,
        getAll: getAll
    };
}());

