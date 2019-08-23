const fs = require('fs');
const reg = require('./status.js');

module.exports = (function () {
    function printFile(req, res, next, where, what) {
        if (req.params && req.params.id === 'control') {
            next();
        } else {
            let toPrint = req[what];

            fs.writeFile(where, JSON.stringify(toPrint), (err) => {
                if (err) {
                    let obj = reg.reterror(500, "/", "listan kunde inte skrivas in", err);

                    return res.status(500).json(obj);
                }
            });
        }
        next();
    }

    return {
        printFile: printFile
    };
}());
