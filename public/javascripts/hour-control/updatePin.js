const rpio = require('rpio');

async function updatePin(req, res, next, par) {
    if (par.gpio === 0) {
        req.error = "Gpio pinne måste knytas till varje zon";
    } else {
        rpio.open(par.gpio, rpio.OUTPUT, par.status);
        rpio.write(par.gpio, par.status);
        let stat = rpio.read(par.gpio);
        let what = 'gpio' + par.gpio;

        req[what] = { gpio: par.gpio, status: stat, mode: 'out' };
    }
}

module.exports = {
    updatePin: updatePin
};
