const fs = require('fs');
const reg = require('./status.js');

module.exports = (function () {
    function getFile(req, res, next, where, what=null) {
        fs.readFile(where, (err, data) => {
            if (err) {
                let obj = reg.reterror(500, "/hourcontrol", "listan kunde inte läsas av", err);

                return res.status(500).json(obj);
            }
            what = what ? what : 'content';
            req[what] = JSON.parse(data);
            next();
        });
    }

    return {
        getFile: getFile
    };
}());
