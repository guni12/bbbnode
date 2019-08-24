const m = require('./controls');
const updl = require('./update-pins');

module.exports = (function () {
    function update(req, res, next) {
        let d = new Date();
        let hour = d.getHours();
        let control = req.controls[hour-1];
        let key = 'c' + control;
        let list = req.prep_gpiodetails;

        if (req.params.id) {
            let status = m[key](req.zones);
            let params = { status: status, list: list };

            list = updl.updateList(req, res, req.zones, params);
        } else {
            req.zones.map((item) => {
                let status = m[key](item);

                list = updl.updateList(req, res, item, [status, list]);
            });
        }
        req.gpiodetails = list;
        next();
    }


    return {
        update: update
    };
}());
