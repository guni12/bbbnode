const m = require('./controls');
const reg = require('./status');
const gpioupdate = require('./update-gpio');

module.exports = (function () {
    function update(req, res, next) {
        let zones = req.zones;
        let controls = req.controls;

        let d = new Date();
        let hour = d.getHours();
        let control = controls[hour-1];
        let key = 'c' + control;
        let list = req.prep_gpiodetails;

        if (req.params.id) {
            let status = m[key](zones);

            list = updateList(req, res, zones, status, list);
        } else {
            zones.map((item) => {
                let status = m[key](item);

                list = updateList(req, res, item, status, list);
            });
        }
        req.gpiodetails = list;
        next();
    }

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

    function show(req, res, what) {
        res.json(req[what]);
    }

    return {
        update: update,
        show: show
    };
}());
