const rpio = require('rpio');
const reg = require('../status');

module.exports = (function () {
    function updOut(req, res, next, obj) {
        rpio.open(obj.gpio, rpio.OUTPUT, obj.status);
        rpio.write(obj.gpio, obj.status);
        let stat = rpio.read(obj.gpio);

        let updated = { gpio: obj.gpio, status: stat, mode: obj.mode };

        if (stat === 0 || stat === 1) {
            req.updated = updated;

            next();
        } else {
            let text = "gpio out kunde inte läsas av";
            let ret = reg.reterror(500, "/", text, updated);

            return res.status(500).json(ret);
        }
    }


    return {
        updOut: updOut
    };
}());
