const rpio = require('rpio');
const fs = require('fs');
const reg = require('./status.js');

module.exports = (function () {
    function update(req, res, next) {
        //console.log(req.body);
        let gpio = parseInt(req.body.gpio);
        let stat = parseInt(req.body.status);
        let mode = req.body.mode;

        //console.log(gpio, stat, mode);
        if (mode === "out") {
            rpio.open(gpio, rpio.OUTPUT, stat);
            rpio.write(gpio, stat);
            stat = rpio.read(gpio);
            let updated = { gpio: gpio, status: stat, mode: mode };

            //console.log(updated);
            if (stat === 0 || stat === 1) {
                req.updated = updated;

                next();
            } else {
                let text = "gpio out kunde inte läsas av";
                let obj = reg.reterror(500, "/hourcontrol", text, updated);

                return res.status(500).json(obj);
            }
        } else {
            rpio.open(gpio, rpio.INPUT);
            stat = rpio.read(gpio);
            let inupdated = { gpio: gpio, status: stat, mode: mode };

            if (stat) {
                req.updated = inupdated;

                next();
            } else {
                let text = "gpio in kunde inte läsas av";
                let obj = reg.reterror(500, "/hourcontrol", text, inupdated);

                return res.status(500).json(obj);
            }
        }
    }

    function updateFile(req, res, next) {
        let newlist = updateList(req.updated, req.gpiodetails);

        req.newlist = newlist;
        next();
    }

    function updateInLoop(updated, list) {
        return void updateList(updated, list);
    }

    function updateList(item, list) {
        try {
            list.forEach((one, index) => {
                if (one.gpio === item.gpio) {
                    //console.log("item.gpio", item.gpio);
                    list[index] = item;
                }
            });
            return list;
        } catch (err) {
            console.log("err", err);
            throw err;
        }
    }

    function writeList(req, res) {
        let list = req.newlist;

        fs.writeFile('./public/scripts/gpiodetails.txt', JSON.stringify(list), err => {
            if (err) {
                let obj = reg.reterror(500, "/hourcontrol", "listan kunde inte skrivas in", err);

                return res.status(500).json(obj);
            }
        });
        //console.log('Sparade till gpiodetails.txt');
        return res.status(201).json(list);
    }

    function readList(req, res, next, file) {
        console.log("Framme!!!!");
        fs.readFile('./public/scripts/' + file, (err, data) => {
            if (err) {
                console.log("err i readList", err);
                let obj = reg.reterror(500, "/hourcontrol", "listan kunde inte läsas av", err);

                return res.status(500).json(obj);
            }
            req.gpiodetails = JSON.parse(data);
            next();
        });
    }

    return {
        update: update,
        updateFile: updateFile,
        updateList: updateList,
        writeList: writeList,
        updateInLoop: updateInLoop,
        readList: readList
    };
}());
