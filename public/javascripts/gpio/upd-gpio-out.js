const rpio = require('rpio');
const th = require('../throw');

function updOut(req, res, next, obj) {
    try {
        let stat = contactRpio(obj);

        if (stat || stat > -1) {
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

module.exports = {
    updOut: updOut
};
