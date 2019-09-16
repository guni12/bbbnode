const one = require('./getOneRow');
const asyn = require('./sqliteAsync');

async function getAll(req, res, next, params) {
    if (req.params.id) {
        await one.getOne(req, res, next, params);
    } else {
        await getAllRows(req, res, next, params);
    }
}

async function getAllRows(req, res, next, params) {
    let sql = "SELECT * FROM " + params.table + ";";

    await asyn.Async(sql, 'all')
        .then((data) => {
            req[params.what] = data;
        })
        .catch(er => {
            next(er);
        });
}

module.exports = {
    getAllRows: getAllRows,
    getAll: getAll
};
