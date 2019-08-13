const fs = require('fs');
const csv = require('fast-csv');

module.exports = (function () {
    function printChosen(arr) {
        const file = fs.createWriteStream('./public/array.txt');

        file.on('error', function(err) { console.log(err); });
        file.write(JSON.stringify(arr));
        file.end();
    }

    function hubinfo(req, res) {
        console.log("req.params.id", req.params.id, typeof(req.params.id));
        let day = req.params.id === '2' ? 'spotprice2.txt' : 'spotprice.txt';
        let myfile = __dirname + '/../../scripts/spot/' + day;
        let chosen = "";
        let arr = [];

        console.log(req.codes);

        fs.createWriteStream('test.csv');
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
                    (item) => item.Area === req.codes.area && item.Currency === req.codes.currency
                );
                console.log("chosen: ", chosen);
                printChosen(chosen);
                return res.json(chosen);
            });
    }

    function spotdata(req, res) {
        let myfile = __dirname + '/../array.txt';

        fs.readFile(myfile, (err, data) => {
            if (err) {
                throw err;
            }
            console.log(JSON.parse(data), "Parsat");
            return res.json(JSON.parse(data));
        });
    }


    return {
        hubinfo: hubinfo,
        spotdata: spotdata
    };
}());
