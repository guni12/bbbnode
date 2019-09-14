const ugo = require('./upd-gpio-out');
const ugi = require('./upd-gpio-in');

async function update(req, res, next) {
    let gpio = parseInt(req.body.gpio, 10);
    let stat = parseInt(req.body.status, 10);
    let mode = req.body.mode;

    try {
        mode === "out" ?
            await ugo.updOut(req, res, next, { gpio: gpio, status: stat, mode: mode }) :
            await ugi.updIn(req, res, next, { gpio: gpio, status: stat, mode: mode });
        //console.log("Resultat i update-gpio", result);
    } catch (err) {
        //console.log("update-gpio catch", err);
        next(err);
    }
}

module.exports = {
    update: update
};
