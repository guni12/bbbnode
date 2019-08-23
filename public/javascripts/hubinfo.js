const fs = require('fs');
const csv = require('fast-csv');
const spotcal = require('./spotcal');
const headers = require('./headers');

module.exports = (function () {
    function hubinfo(req, res, next) {
        let d = new Date();
        let hour = d.getHours();
        let hs = headers.list;
        let area = req.settings.area;
        let currency = req.settings.currency;

        console.log("req.settings, req.content", req.settings, req.content);


        if (req.params && req.params.id === 'control') {
            spotcal.tocontrol(req, res, next);
        } else {
            let f1 = 'spotprice2.txt';
            let day = req.params && req.params.id === '2' && hour > 16 ? f1 : 'spotprice.txt';
            let myfile = __dirname + '/../scripts/spot/' + day;
            let chosen = "";
            let arr = [];

            const fileStream = fs.createReadStream(myfile);
            const parser = csv.parse({
                comment: '#',
                strictColumnHandling: false,
                renameHeaders: false,
                headers: hs,
                delimiter: ';'
            });

            fileStream
                .pipe(parser)
                .on('error', error => console.error(error))
                .on('data', (data) => {
                    arr.push(data);
                })
                .on('end', (rowCount) => {
                    chosen = arr.find(
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
