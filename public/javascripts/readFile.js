const fs = require('fs');
const reg = require('./status.js');

module.exports = (function () {
    //where, what=null
    function getFile(req, res, next, params) {
        fs.readFile(params.where, (err, data) => {
            if (err) {
                let obj = reg.reterror(500, "/hourcontrol", "listan kunde inte läsas av", err);

                return res.status(500).json(obj);
            }
            let what = params.what ? params.what : 'content';

            req[what] = JSON.parse(data);
            next();
        });
    }

    return {
        getFile: getFile
    };
}());
