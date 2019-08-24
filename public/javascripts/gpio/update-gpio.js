const ugo = require('./upd-gpio-out');
const ugi = require('./upd-gpio-in');

module.exports = (function () {
    function update(req, res, next) {
        let gpio = parseInt(req.body.gpio);
        let stat = parseInt(req.body.status);
        let mode = req.body.mode;

        if (mode === "out") {
            ugo.updOut(req, res, next, { gpio: gpio, status: stat, mode: mode });
        } else {
            ugi.updIn(req, res, next, { gpio: gpio, status: stat, mode: mode });
        }
    }

    return {
        update: update
    };
}());
