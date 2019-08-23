const sensor = require('ds18b20-raspi');
const reg = require('./status.js');
const ct = require('./currtime.js');

module.exports = (function () {
    let time = ct.time;
    let date = ct.date;

    function initSensors(req, res, next) {
        sensor.list((err, deviceIds) => {
            if (err) {
                let obj = reg.reterror(500, './find', err);

                return res.status(500).json(obj);
            } else {
                deviceIds.push(time);
                deviceIds.push(date);
                req.printSensors = deviceIds;
                req.file = 'sensors.txt';
                next();
            }
        });
    }


    return {
        initSensors: initSensors
    };
}());
