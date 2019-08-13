const m = require('./controls.js');

module.exports = (function () {
    function update(req, res) {
        console.log(req.cal);
        let zones = req.zones;
        let controls = req.cal;

        let d = new Date();
        let hour = d.getHours();
        let control = controls[hour-1];

        console.log(hour, controls.length, controls[23]);

        console.log(req.params);
        if (req.params.id) {
            m['c'+control](zones);
        } else {
            zones.map((item) => {
                console.log(control);
                m['c'+control](item);
            });
        }
        res.json(req.zones);
    }

    return {
        update: update
    };
}());
