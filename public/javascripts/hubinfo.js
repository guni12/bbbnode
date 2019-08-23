const fs = require('fs');
const spotcal = require('./spotcal');
const ps = require('./parser');

module.exports = (function () {
    function hubinfo(req, res, next) {
        let d = new Date();
        let hour = d.getHours();
        let area = req.settings.area;
        let currency = req.settings.currency;

        if (req.params && req.params.id === 'control') {
            spotcal.tocontrol(req, res, next);
        } else {
            let f1 = 'spotprice2.txt';
            let day = req.params && req.params.id === '2' && hour > 16 ? f1 : 'spotprice.txt';
            let myfile = __dirname + '/../scripts/spot/' + day;
            let arr = [];

            const fileStream = fs.createReadStream(myfile);
            const parser = ps.makeparser();

            fileStream
                .pipe(parser)
                .on('error', error => console.error(error))
                .on('data', (data) => {
                    arr.push(data);
                })
                .on('end', (rowCount) => {
                    let chosen = arr.find(
                        (im) => im.Area === area && im.Currency === currency
                    );

                    console.log(rowCount, "rader för area och currency:", area, currency);
                    req.chosen = chosen;
                    next();
                });
        }
    }

    return {
        hubinfo: hubinfo
    };
}());
