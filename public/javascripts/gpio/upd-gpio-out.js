const rpio = require('rpio');
const reg = require('../status');

module.exports = (function () {
    function updOut(req, res, next, obj) {
        try {
            let stat = contactRpio(obj);

            try {
                if (stat) {
                    req.updated = { gpio: obj.gpio, status: stat, mode: obj.mode };
                } else {
                    let text = "Gpio pinne kunde ej kontaktas";
                    let obj = reg.throwerror("Error", 500, "/upd-gpio-out", text);

                    throw { obj, error: new Error() };
                }
            } catch (err) {
                next(err);
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
