const fs = require('fs').promises;
const reg = require('./status');

module.exports = (function () {
    async function printFile(req, res, next, params) {
        try {
            if (req[params.what]) {
                await fs.writeFile(params.where, JSON.stringify(req[params.what]));
                //console.info("Filen '" + params.where + "' sparades med fs.promises");
            } else {
                let text = 'Inget innehåll att spara till fil';
                let obj = reg.throwerror("Bad request", 400, "printFile", text);

                throw { obj, error: new Error() };
            }
        } catch (err) {
            //console.error(err);
            next(err);
        }
    }

    return {
        printFile: printFile
    };
}());

