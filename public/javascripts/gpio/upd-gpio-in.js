const th = require('../throw');
const cr = require('./contactRpio');

async function updIn(req, res, next, obj) {
    try {
        let stat = await cr.contactRpioIn(obj);

        if (stat && stat > -1) {
            req.updated = { gpio: obj.gpio, status: stat, mode: "in" };
        } else {
            let text = "Gpio pinne kunde ej kontaktas";
            let obj = th.throwerror("Error", 500, "/upd-gpio-in", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    updIn: updIn
};
