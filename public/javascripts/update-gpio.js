const rpio = require('rpio');
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
                let obj = reg.reterror(500, "/", text, updated);

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
                let obj = reg.reterror(500, "/", text, inupdated);

                return res.status(500).json(obj);
            }
        }
    }

    function updateList(req, res, next, item, list) {
        let lst = req[list];
        let itm = req[item];

        lst.forEach((one, index) => {
            if (one.gpio === itm.gpio) {
                lst[index] = itm;
            }
        });
        req.newlist = lst;
        return lst;
    }


    return {
        update: update,
        updateList: updateList
    };
}());
