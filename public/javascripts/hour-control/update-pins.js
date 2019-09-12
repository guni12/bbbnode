const m = require('./updatePin');
const gpioupdate = require('./update-gpio-list');
const reg = require('../status');

module.exports = (function () {
    async function updateList(req, res, next, params) {
        try {
            let par1 = { gpio: params.gpio, status: params.status };

            console.log(params, "params");

            if (params.gpio === null || params.gpio === 0) {
                let text = "Gpio pinne måste knytas till varje zon";
                let obj = reg.throwerror("Error", 500, "/update-pins", text);

                throw { obj, error: new Error() };
            } else {
                await m.updatePin(req, res, next, par1);
                let par2 = { what: params.what, toupdate: 'gpio'+ params.gpio};

                await gpioupdate.updateList(req, next, params.list, par2);
            }
        } catch (err) {
            console.log("I update-pins err", err);
            next(err);
        }
    }

    return {
        updateList: updateList
    };
}());