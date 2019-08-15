const m = require('./controls');
const reg = require('./status');
const gpioupdate = require('./update-gpio');

module.exports = (function () {
    function update(req, res, next) {
        //console.log(req.cal);
        let zones = req.zones;
        let controls = req.cal;

        let d = new Date();
        let hour = d.getHours();
        let control = controls[hour-1];

        //console.log(hour, controls.length, controls[23]);

        //console.log(req.params);
        if (req.params.id) {
            let status = m['c'+control](zones);

            try {
                req.updated = m.updatePin(zones.gpio, status);
                next();
            } catch (err) {
                let message = "Gpio pinne kunde ej läsas.";
                let obj = reg.reterror(500, "/hourcontrol", message, err);

                return res.status(500).json(obj);
            }
        } else {
            zones.map((item) => {
                //console.log(control, item);
                let status = m['c'+control](item);

                req.gpio = item.gpio;
                req.gpiostatus = status;
                try {
                    let updated = m.updatePin(item.gpio, status);

                    gpioupdate.updateInLoop(updated, req.gpiodetails);
                } catch (err) {
                    let message = "Gpio pinne kunde ej läsas.";
                    let obj = reg.reterror(500, "/hourcontrol", message, err);

                    return res.status(500).json(obj);
                }
            });
            next();
        }
    }

    function show(req, res) {
        res.json(req.gpiodetails);
    }

    return {
        update: update,
        show: show
    };
}());
