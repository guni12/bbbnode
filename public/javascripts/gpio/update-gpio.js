const ug = require('./update');
const th = require('../throw');

async function update(req, res, next) {
    let gpio = parseInt(req.body.gpio, 10);
    let stat = parseInt(req.body.status, 10);
    let mode = req.body.mode;
    let obj = { gpio: gpio, status: stat, mode: mode };

    try {
        let newstat = await ug.getstat(req, res, next, obj);

        if (newstat === 0 || newstat === 1) {
            await newdata(req, obj, newstat);
        } else {
            let text = "Gpio pinne kunde ej kontaktas";
            let obj = th.throwerror("Error", 500, "upd-gpio-out", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        //console.log("update-gpio catch", err);
        next(err);
    }
}

async function newdata(req, obj, stat) {
    req.updated = { gpio: obj.gpio, status: stat, mode: "out" };
}

module.exports = {
    update: update
};
