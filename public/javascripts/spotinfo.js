const fs = require('fs');
const ps = require('./parser');

module.exports = (function () {
    function spotinfo(req, res, next, file) {
        let arr = [];
        const area = req.settings.area;
        const currency = req.settings.currency;
        const fileStream = fs.createReadStream(file);
        const parser = ps.makeparser();

        fileStream
            .pipe(parser)
            .on('error', error => console.error(error))
            .on('data', (data) => {
                arr.push(data);
            })
            .on('end', () => {
                req.chosen = arr.find(
                    (im) => im.Area === area && im.Currency === currency
                );
                next();
            });
    }

    return {
        spotinfo: spotinfo
    };
}());

