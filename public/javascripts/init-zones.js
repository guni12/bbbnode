const asyn = require('./sqliteAsync');

async function check(req, res, next) {
    let sql = "SELECT * FROM zones";

    try {
        const exist = await asyn.Async(sql, 'get');

        return exist;
    } catch (err) {
        //console.log(err);
        return next(err);
    }
}

module.exports = {
    check: check
};
