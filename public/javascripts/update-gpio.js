var rpio = require('rpio');
const fs = require('fs');

module.exports = (function () {
    function update(req, res) {
        console.log(req.body);
        let gpio = parseInt(req.body.gpio);
        let stat = parseInt(req.body.status);
        let mode = req.body.mode;

        console.log(gpio, stat, mode);
        if (mode === "out") {
            rpio.open(gpio, rpio.OUTPUT, stat);
            rpio.write(gpio, stat);
            stat = rpio.read(gpio);
            console.log("Här: ", stat);
        } else {
            rpio.open(gpio, rpio.INPUT);
            stat = rpio.read(gpio);
        }

        let updated = { gpio: gpio, status: stat, mode: mode };

        console.log(updated);

        updateFile(updated);

        return res.status(201).json(updated);
    }

    function updateFile(item) {
        fs.readFile('./public/scripts/gpiodetails.txt', (err, data) => {
            if (err) {
                console.log("err i update", err);
                throw err;
            }
            let list = JSON.parse(data);
            //console.log(list, "Parsat i edit");
            let updated = updateList(item, list);

            //console.log("Uppdaterat: ", updated);
            writeList(updated);
        });
    }

    function updateList(item, list) {
        list.forEach((one, index) => {
            if (one.gpio === item.gpio) {
                console.log("item.gpio", item.gpio);
                list[index] = item;
            }
        });
        return list;
    }

    function writeList(list) {
        fs.writeFile('./public/scripts/gpiodetails.txt', JSON.stringify(list), function (err) {
            if (err) {
                throw err;
            }
            //console.log('Sparade till gpiodetails.txt');
        });
    }

    return {
        update: update,
        updateFile: updateFile
    };
}());
