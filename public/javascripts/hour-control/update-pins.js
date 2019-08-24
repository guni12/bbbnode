const m = require('./updatePin');
const reg = require('../status');
const gpioupdate = require('./update-gpio-list');

module.exports = (function () {
    function updateList(req, res, item, params) {
        try {
            let updated = m.updatePin(item.gpio, params.status);

            return gpioupdate.updateList(updated, params.list);
        } catch (err) {
            let message = "Gpio pinne kunde ej läsas.";
            let obj = reg.reterror(500, "/hourcontrol", message, err);

            return res.status(500).json(obj);
        }
    }

    return {
        updateList: updateList
    };
}());
