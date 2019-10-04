const eg = require('../db/edit-gpio');
const th = require('../throw');
const cr = require('../gpio/contactRpio');

async function updatePin(req, res, next, par) {
    //console.log("UPDATEPIN - par.gpio", par, par.gpio);
    let stat = await cr.contactRpioOut(par);
    let what = 'gpio' + par.gpio;
    const params = { table: 'gpios'};

    req[what] = { gpio: par.gpio, status: stat, mode: 'out', id: par.id };
    req.updated= { gpio: par.gpio, status: stat, mode: 'out', id: par.id };
    if (stat === 0 || stat === 1) {
        await eg.update(req, res, next, params);
    } else {
        let text = "Gpio pinne kunde ej nås";
        let obj = th.throwerror("Error", 500, "updatePin", text);

        throw { obj, error: new Error() };
    }
}


module.exports = {
    updatePin: updatePin
};
