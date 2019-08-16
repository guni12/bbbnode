const fs = require('fs');

module.exports = (function () {
    function printChosen(req, res, next) {
        let arr = req.cal;
        const file = fs.createWriteStream('./public/array.txt');

        file.on('error', function(err) { console.log(err); });
        file.write(JSON.stringify(arr));
        file.end();
        next();
    }

    function show(req, res) {
        let what = req.cal;

        return res.json(what);
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
        show: show,
        tocontrol: tocontrol,
        spotdata: spotdata,
        printChosen: printChosen
    };
}());
