const sensor = require('ds18b20-raspi');
const ct = require('./currtime.js');
const th = require('../throw');

async function initSensors(req, res, next) {
    let time = ct.getTime();
    let date = ct.getDate();

    try {
        const list = sensor.list();

        if (list.length > 0) {
            list.push(time);
            list.push(date);
            req.printSensors = list;
        } else {
            let text = "Could not find any 1-Wire sensors to list";
            let obj = th.throwerror("Error", 500, "find-sensors", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    initSensors: initSensors
};
