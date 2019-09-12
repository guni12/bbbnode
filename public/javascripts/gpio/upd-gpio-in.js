const rpio = require('rpio');
const th = require('../throw');

module.exports = (function () {
    async function updIn(req, res, next, obj) {
        try {
            let stat = contactRpio(obj);

            try {
                if (stat) {
                    req.updated = { gpio: obj.gpio, status: stat, mode: obj.mode };
                } else {
                    let text = "Gpio pinne kunde ej kontaktas";
                    let obj = th.throwerror("Error", 500, "/upd-gpio-in", text);

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
        rpio.open(obj.gpio, rpio.INPUT);
        return rpio.read(obj.gpio);
    }


    return {
        updIn: updIn
    };
}());
