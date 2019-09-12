const rpio = require('rpio');
const th = require('../throw');

module.exports = (function () {
    function updOut(req, res, next, obj) {
        try {
            if (contactRpio(obj)) {
                req.updated = { gpio: obj.gpio, status: contactRpio(obj), mode: obj.mode };
            } else {
                let text = "Gpio pinne kunde ej kontaktas";
                let obj = th.throwerror("Error", 500, "upd-gpio-out", text);

                throw { obj, error: new Error() };
            }
        } catch (err) {
            next(err);
        }
    }

    function contactRpio(obj) {
        rpio.open(obj.gpio, rpio.OUTPUT, obj.status);
        rpio.write(obj.gpio, obj.status);
        return rpio.read(obj.gpio);
    }


    return {
        updOut: updOut
    };
}());
