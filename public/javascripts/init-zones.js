const ag = require('./sqliteAsyncGet');

module.exports = (function () {
    async function check(req, res, next) {
        let sql = "SELECT * FROM zones";

        try {
            const exist = await ag.getAsync(sql);

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

