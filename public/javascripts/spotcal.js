const fs = require('fs');
const csv = require('fast-csv');

module.exports = (function () {
    function printChosen(arr) {
        const file = fs.createWriteStream('./public/array.txt');

        file.on('error', function(err) { console.log(err); });
        file.write(JSON.stringify(arr));
        file.end();
    }

    function show(req, res) {
        let what = req.cal;

        return res.json(what);
    }

    function hubinfo(req, res, next) {
        if (req.params.id === 'control') {
            //console.log(req.codes, "Direkt control");
            tocontrol(req, res, next);
        } else {
            //console.log("req.params.id", req.params.id, typeof(req.params.id), req.params);
            let day = req.params.id === '2' ? 'spotprice2.txt' : 'spotprice.txt';
            let myfile = __dirname + '/../scripts/spot/' + day;
            let chosen = "";
            let arr = [];

            //console.log(req.codes);

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
                        (im) => im.Area === req.codes.area && im.Currency === req.codes.currency
                    );
                    //console.log("chosen: ", chosen);
                    if (req.params.id === undefined) {
                        printChosen(chosen);
                    }
                    //return res.json(chosen);
                    req.cal = chosen;

                    next();
                });
        }
    }


    function tocontrol(req, res, next) {
        let myfile = __dirname + '/../array.txt';

        fs.readFile(myfile, (err, data) => {
            if (err) {
                throw err;
            }
            //console.log("tocontrol", req.codes);
            let parsed = JSON.parse(data);
            let isaway = false;

            if (req.codes.awayfrom !== null && req.code.awayto !== null) {
                isaway = true;
            }
            let arr = extractControls(parsed, req.codes, isaway);

            req.cal = arr;

            //console.log(req.cal);
            next();
        });
    }



    function extractControls(data, codes, isaway) {
        let temp = [];
        let avg = parseFloat(data['Average']) / 10;
        let marker = (codes.percent/10)+1;

        //console.log("I extract: ", codes.percent, avg, marker);

        for (let i = 1; i < 26; i++) {
            let key = i < 3 ? 'Hour' + i : 'Hour' + (i-1);
            let price = 0;

            if (i === 3) {
                key = 'Hour' + i + 'A';
                price = data[key] === "" ? null : parseFloat(data[key]) / 10;
                if (price) {
                    if ((price * marker) > avg) {
                        //console.log("Högre", i, key, price);
                        temp.push(1);
                    } else {
                        temp.push(0);
                        //console.log(i, key, price);
                    }
                }
            } else if (i === 4) {
                key = 'Hour' + (i-1) + 'B';
                if (price) {
                    if ((price * marker) > avg) {
                        //console.log("Högre", i, key, price);
                        temp.push(1);
                    } else {
                        temp.push(0);
                        //console.log(i, key, price);
                    }
                }
            } else {
                price = data[key] === "" ? null : parseFloat(data[key]) / 10;
                if (price && ((price * marker) > avg)) {
                    //console.log(i, key, "Högre", price, avg, price * marker);
                    temp.push(1);
                } else if (price) {
                //console.log(i, key, price);
                    temp.push(0);
                }
            }
        }

        let check = false;

        //console.log("temp.length", temp.length);
        for (let i = 0; i < temp.length; i++) {
            if (temp[i] === 1 && check === false) {
                if (i > 0) {temp[i-1] = 2;}
                if (i > 1) {temp[i-2] = 2;}
                check = true;
            }
            if (check === true && temp[i] === 0) {
                check = false;
            }
        }
        //console.log("extractControls: ", temp);


        if (isaway) {
            temp.fill(3);
        }
        if (codes.percenton === 0) {
            temp.fill(0);
        }
        return temp;
    }

    function spotdata(req, res) {
        let myfile = __dirname + '/../array.txt';

        fs.readFile(myfile, (err, data) => {
            if (err) {
                throw err;
            }
            //console.log(JSON.parse(data), "Parsat");
            return res.json(JSON.parse(data));
        });
    }

    return {
        hubinfo: hubinfo,
        show: show,
        tocontrol: tocontrol,
        spotdata: spotdata
    };
}());
