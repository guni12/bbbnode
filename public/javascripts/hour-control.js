const m = require('./controls');
const updl = require('./update-gpio-list');

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

            list = updl.updateList(req, res, zones, status, list);
        } else {
            zones.map((item) => {
                let status = m[key](item);

                list = updl.updateList(req, res, item, status, list);
            });
        }
        req.gpiodetails = list;
        next();
    }


    return {
        update: update
    };
}());
