const m = require('./controls');
const reg = require('./status');
const gpioupdate = require('./update-gpio');

module.exports = (function () {
    function update(req, res, next) {
        //console.log(req.controls);
        let zones = req.zones;
        let controls = req.controls;

        let d = new Date();
        let hour = d.getHours();
        let control = controls[hour-1];

        //console.log(hour, controls.length, controls[23]);

        //console.log(req.params);
        if (req.params.id) {
            let key = 'c' + control;
            let status = m[key](zones);

            try {
                req.updated = m.updatePin(zones.gpio, status);
                next();
            } catch (err) {
                let message = "Gpio pinne kunde ej läsas.";
                let obj = reg.reterror(500, "/hourcontrol", message, err);

                return res.status(500).json(obj);
            }
        } else {
            let list = req.prep_gpiodetails;

            zones.map((item) => {
                //console.log(control, item);
                let key = 'c' + control;
                let status = m[key](item);

                req.gpio = item.gpio;
                //req.gpiostatus = status;
                try {
                    let updated = m.updatePin(item.gpio, status);

                    list = gpioupdate.updateInLoop(updated, list);
                } catch (err) {
                    let message = "Gpio pinne kunde ej läsas.";
                    let obj = reg.reterror(500, "/hourcontrol", message, err);

                    return res.status(500).json(obj);
                }
            });
            req.gpiodetails = list;
            next();
        }
    }

    function show(req, res, what) {
        res.json(req[what]);
    }

    return {
        update: update,
        show: show
    };
}());
