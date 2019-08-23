const sensor = require('ds18b20-raspi');
const reg = require('./status.js');
const ct = require('./currtime.js');

module.exports = (function () {
    let time = ct.time;
    let date = ct.date;

    function sensorsWithTime(req, res, next) {
        let item = {time: time, date: date};

        sensor.readAllC(2, (err, temps) => {
            if (err) {
                let obj = reg.reterror(500, './find', err, item);

                return res.status(500).json(obj);
            } else {
                temps.push(item);
                req.printSwt= temps;
            }
        });
        next();
    }

    return {
        sensorsWithTime: sensorsWithTime
    };
}());
