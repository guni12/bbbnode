const rpio = require('rpio');
const th = require('../throw');

async function updIn(req, res, next, obj) {
    let stat = contactRpio(obj);

    if (stat) {
        req.updated = { gpio: obj.gpio, status: stat, mode: obj.mode };
    } else {
        let text = "Gpio pinne kunde ej kontaktas";
        let obj = th.throwerror("Error", 500, "/upd-gpio-in", text);

        throw { obj, error: new Error() };
    }
}

function contactRpio(obj) {
    rpio.open(obj.gpio, rpio.INPUT);
    return rpio.read(obj.gpio);
}

module.exports = {
    updIn: updIn
};
