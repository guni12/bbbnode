const fs = require('fs').promises;
const reg = require('./status');

module.exports = (function () {
    async function getFile(req, res, next, params) {
        try {
            if (params.what && params.where) {
                req[params.what] = await fs.readFile(params.where, 'utf-8');
            } else {
                let text = 'Fil eller parameter saknas.';
                let obj = reg.throwerror("Error", 400, "readFile", text);

                throw { obj, error: new Error() };
            }
        } catch (err) {
            next(err);
        }
    }

    return {
        getFile: getFile
    };
}());
