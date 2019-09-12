const fs = require('fs');
const ps = require('./parser');

module.exports = (function () {
    async function collectInfo(file, req) {
        let arr = [];
        const area = req.settings.area;
        const currency = req.settings.currency;
        const parser = ps.makeparser();
        const fileStream = fs.createReadStream(file);

        return new Promise( (resolve, reject) => {
            fileStream
                .pipe(parser)
                .on('error', error => {
                    reject(error);
                })
                .on('data', (data) => {
                    arr.push(data);
                })
                .on('end', () => {
                    let result = arr.find(
                        (im) => im.Area === area && im.Currency === currency
                    );

                    resolve(result);
                    req.chosen = result;
                });
        });
    }

    return {
        collectInfo: collectInfo
    };
}());
