const m = require('./controls');
const reg = require('./status');
const gpioupdate = require('./update-gpio');

module.exports = (function () {
    function updateList(req, res, item, status, list) {
        let temp;

        try {
            let updated = m.updatePin(item.gpio, status);

            temp = gpioupdate.updateList(updated, list);
        } catch (err) {
            let message = "Gpio pinne kunde ej läsas.";
            let obj = reg.reterror(500, "/hourcontrol", message, err);

            return res.status(500).json(obj);
        }
        return temp;
    }

    return {
        updateList: updateList
    };
}());
