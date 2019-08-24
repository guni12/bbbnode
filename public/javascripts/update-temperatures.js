const sensor = require('ds18b20-raspi');
const reg = require('./status');
const ct = require('./currtime');

module.exports = (function () {
    function update(req, res, next) {
        let time = ct.time;
        let date = ct.date;

        sensor.readAllC(2, (err, temps) => {
            if (err) {
                let item = {time: time, date: date};
                let obj = reg.reterror(500, './tempupdate', err, item);

                return res.status(500).json(obj);
            } else {
                let item = {time: time, date: date};

                temps.push(item);
                req.content = temps;
                next();
            }
        });
    }


    return {
        update: update
    };
}());
