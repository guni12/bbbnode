const as = require('./sqliteAsync');

module.exports = (function () {
    async function check(req, res, next) {
        let sql = "SELECT * FROM zones";

        try {
            const exist = await as.getAsync(sql);

            return exist;
        } catch (err) {
            //console.log(err);
            return next(err);
        }
    }


    return {
        check: check
    };
}());

