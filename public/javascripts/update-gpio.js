const rpio = require('rpio');
const fs = require('fs');
const reg = require('./status.js');

module.exports = (function () {
    function update(req, res, next) {
        let gpio = parseInt(req.body.gpio);
        let stat = parseInt(req.body.status);
        let mode = req.body.mode;

        if (mode === "out") {
            rpio.open(gpio, rpio.OUTPUT, stat);
            rpio.write(gpio, stat);
            stat = rpio.read(gpio);
            let updated = { gpio: gpio, status: stat, mode: mode };

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

    function updateList(item, list) {
        list.forEach((one, index) => {
            if (one.gpio === item.gpio) {
                list[index] = item;
            }
        });
        return list;
    }

    function writeList(req, res) {
        let list = req.newlist;

        fs.writeFile('./public/scripts/gpiodetails.txt', JSON.stringify(list), err => {
            if (err) {
                let obj = reg.reterror(500, "/hourcontrol", "listan kunde inte skrivas in", err);

                return res.status(500).json(obj);
            }
        });
        return res.status(201).json(list);
    }

    function readList(req, res, next, file, what) {
        fs.readFile('./public/scripts/' + file, (err, data) => {
            if (err) {
                let obj = reg.reterror(500, "/hourcontrol", "listan kunde inte läsas av", err);

                return res.status(500).json(obj);
            }
            req[what] = JSON.parse(data);
            next();
        });
    }

    return {
        update: update,
        updateList: updateList,
        writeList: writeList,
        readList: readList
    };
}());
