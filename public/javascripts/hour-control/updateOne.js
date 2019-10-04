const m = require('./controls');
const up = require('./updatePin');
const th = require('../throw');

async function updateOne(req, res, next, par) {
    let list = req.gpios;
    let rms = req.rooms[0];
    let status = m[par.key](req.rooms);
    let gpar = { list: list, status: status, gpio: rms.gpio, id: rms.id, what: 'gpiodetails' };

    try {
        if (rms.gpio === 0) {
            let text = "Gpio pinne måste knytas till varje zon";
            let obj = th.throwerror("Error", 500, "/updateOne", text);

            throw { obj, error: new Error() };
        } else {
            await up.updatePin(req, res, next, gpar);
        }
    } catch (err) {
        next(err);
        //console.log("updateOne err: ", err);
    }
}

module.exports = {
    updateOne: updateOne
};
