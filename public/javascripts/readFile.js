const fs = require('fs').promises;
const th = require('./throw');

async function getFile(req, res, next, params) {
    try {
        if (params.what && params.where) {
            req[params.what] = await fs.readFile(params.where, 'utf-8');
        } else {
            let text = 'Fil eller parameter saknas.';
            let obj = th.throwerror("Error", 400, "readFile", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getFile: getFile
};
