const asyn = require('./sqliteAsync');
const reg = require('./status');

module.exports = (function () {
    async function getOne(req, res, next, params) {
        let id = params.table === "settings" ? 1 : parseInt(req.params.id);
        let sql = "SELECT * FROM " + params.table + " WHERE id = " + id + ";";

        await asyn.getAsync(sql)
            .then((data) => {
                //console.log("Row", data);
                if (!data) {
                    let text = 'Detta id finns inte';
                    let obj = reg.throwerror("Bad Request", 400, "getOneRow", text);

                    throw { obj, error: new Error() };
                } else {
                    req[params.what] = data;
                    return data;
                }
            })
            .catch(er => {
                next(er);
            });
    }


    return {
        getOne: getOne
    };
}());
