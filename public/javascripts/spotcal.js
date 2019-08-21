const fs = require('fs');
const extract = require('./extractControls');

module.exports = (function () {
    function tocontrol(req, res, next) {
        let myfile = __dirname + '/../array.txt';

        fs.readFile(myfile, (err, data) => {
            if (err) {
                throw err;
            }
            let parsed = JSON.parse(data);
            let isaway = false;

            if (req.settings.awayfrom !== null && req.settings.awayto !== null) {
                isaway = true;
            }
            let arr = extract.extractControls(parsed, req.settings, isaway);

            req.controls = arr;
            next();
        });
    }

    return {
        tocontrol: tocontrol
    };
}());
