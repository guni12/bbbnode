const fs = require('fs');
const ps = require('./parser');

module.exports = (function () {
    async function collectInfo(file, req) {
        let arr = [];
        const set = req.settings;
        const fileStream = fs.createReadStream(file);

        return new Promise( (resolve, reject) => {
            fileStream
                .pipe(ps.makeparser())
                .on('error', error => {
                    reject(error);
                })
                .on('data', (data) => {
                    arr.push(data);
                })
                .on('end', () => {
                    let result = arr.find(
                        (im) => im.Area === set.area && im.Currency === set.currency
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
