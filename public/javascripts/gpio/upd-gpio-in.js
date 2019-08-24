const rpio = require('rpio');
const reg = require('../status');

module.exports = (function () {
    function updIn(req, res, next, obj) {
        rpio.open(obj.gpio, rpio.INPUT);
        let stat = rpio.read(obj.gpio);

        if (stat) {
            req.updated = { gpio: obj.gpio, status: stat, mode: obj.mode };

            next();
        } else {
            let text = "gpio in kunde inte läsas av";
            let message = reg.reterror(500, "/", text);

            return res.status(500).json(message);
        }
    }


    return {
        updIn: updIn
    };
}());

