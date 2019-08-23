const rpio = require('rpio');
const reg = require('./status');
const ugo = require('./upd-gpio-out');

module.exports = (function () {
    function update(req, res, next) {
        let gpio = parseInt(req.body.gpio);
        let stat = parseInt(req.body.status);
        let mode = req.body.mode;

        if (mode === "out") {
            ugo.updOut(req, res, next, { gpio: gpio, status: stat, mode: mode });
        } else {
            rpio.open(gpio, rpio.INPUT);
            stat = rpio.read(gpio);

            if (stat) {
                req.updated = { gpio: gpio, status: stat, mode: mode };

                next();
            } else {
                let text = "gpio in kunde inte läsas av";
                let obj = reg.reterror(500, "/", text);

                return res.status(500).json(obj);
            }
        }
    }

    return {
        update: update
    };
}());
