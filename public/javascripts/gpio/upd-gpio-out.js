const th = require('../throw');
const cr = require('./contactRpio');

async function updOut(req, res, next, obj) {
    try {
        let stat = await cr.contactRpioOut(obj);

        if (stat && stat > -1) {
            req.updated = { gpio: obj.gpio, status: stat, mode: "out" };
        } else {
            let text = "Gpio pinne kunde ej kontaktas";
            let obj = th.throwerror("Error", 500, "upd-gpio-out", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    updOut: updOut
};
