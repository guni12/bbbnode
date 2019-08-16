const fs = require('fs');
const csv = require('fast-csv');
const spotcal = require('./spotcal');

module.exports = (function () {
    function hubinfo(req, res, next) {
        if (req.params.id === 'control') {
            //console.log(req.codes, "Direkt control");
            spotcal.tocontrol(req, res, next);
        } else {
            //console.log("req.params.id", req.params.id, typeof(req.params.id), req.params);
            let day = req.params.id === '2' ? 'spotprice2.txt' : 'spotprice.txt';
            let myfile = __dirname + '/../scripts/spot/' + day;
            let chosen = "";
            let arr = [];

            //console.log(req.codes);

            //fs.createWriteStream('test.csv');
            const fileStream = fs.createReadStream(myfile);
            const parser = csv.parse({
                comment: '#',
                strictColumnHandling: false,
                renameHeaders: false,
                headers: [
                    'Data type(PR)',
                    'Code(SO,SF)',
                    'Year',
                    'Week',
                    'Day of week',
                    'Date(dd.mm.yyyy)',
                    'Area',
                    'Currency',
                    'Hour1',
                    'Hour2',
                    'Hour3A',
                    'Hour3B',
                    'Hour4',
                    'Hour5',
                    'Hour6',
                    'Hour7',
                    'Hour8',
                    'Hour9',
                    'Hour10',
                    'Hour11',
                    'Hour12',
                    'Hour13',
                    'Hour14',
                    'Hour15',
                    'Hour16',
                    'Hour17',
                    'Hour18',
                    'Hour19',
                    'Hour20',
                    'Hour21',
                    'Hour22',
                    'Hour23',
                    'Hour24',
                    'Average'
                ],
                delimiter: ';'
            });

            fileStream
                .pipe(parser)
                .on('error', error => console.error(error))
                .on('data', (data) => {
                    arr.push(data);
                })
                .on('end', (rowCount) => {
                    console.log(`Parsed ${rowCount} rows`);
                    chosen = arr.find(
                        (im) => im.Area === req.codes.area && im.Currency === req.codes.currency
                    );
                    console.log("chosen i Hubinfo: ", chosen, req.params.id);
                    req.cal = chosen;

                    if (req.params.id === undefined) {
                        spotcal.printChosen(req, res, next);
                    }
                    next();
                });
        }
    }

    return {
        hubinfo: hubinfo
    };
}());