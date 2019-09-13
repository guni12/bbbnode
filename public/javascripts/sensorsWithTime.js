const sensor = require('ds18b20-raspi');
const th = require('./throw');
const ct = require('./currtime.js');

let time = ct.time;
let date = ct.date;

async function sensorsWithTime(req, res, next) {
    let item = {time: time, date: date};

    try {
        let list = sensor.readAllC(2);

        if (list.length > 0) {
            list.push(item);
            req.content = list;
        } else {
            let text = "ds18b20-raspi kan inte nå sensorerna";
            let obj = th.throwerror("Error", 500, "sensorsWithTime", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    sensorsWithTime: sensorsWithTime
};
