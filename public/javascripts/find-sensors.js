const fs = require('fs');
const rpio = require('rpio');
const sensor = require('ds18b20-raspi');
const reg = require('./status.js');

module.exports = (function () {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    const timeoptions = {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const d = new Date();
    let time = d.toLocaleTimeString('sv-SE', timeoptions);
    let date = d.toLocaleDateString('sv-SE', options);

    function initPins(req, res, next) {
        let gpiolist = [];
        let pins = [
            3, 5, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19,
            21, 22, 23, 24, 26, 29, 31, 32, 33, 35, 36, 37, 38, 40
        ];

        for (let i = 0; i < pins.length; i++) {
            rpio.open(pins[i], rpio.OUTPUT);
            rpio.write(pins[i], + rpio.LOW);
            let pin = rpio.read(pins[i]);
            let pinobj = {
                gpio: pins[i],
                status: pin,
                mode: 'out'
            };

            gpiolist.push(pinobj);
        }
        req.printPins = gpiolist;
        req.pinfile = 'gpiodetails.txt';
        next();
    }


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

    function sensorsWithTime(req, res, next) {
        let item = {time: time, date: date};

        sensor.readAllC(2, (err, temps) => {
            if (err) {
                let obj = reg.reterror(500, './find', err, item);

                return res.status(500).json(obj);
            } else {
                temps.push(item);
                req.printSwt= temps;
                req.file = 'sensordetails.txt';
            }
        });
        next();
    }


    function show(req, res) {
        return res.json(req.printobj);
    }



    function printFile(req, res, next, file, what) {
        //let file = req.file;
        //let obj = req.printobj;
        let obj = req[what];

        fs.writeFile('./public/scripts/' + file, JSON.stringify(obj), err => {
            if (err) {
                let obj = reg.reterror(500, './find', err);

                return res.status(500).json(obj);
            }
        });
        next();
    }

    return {
        initPins: initPins,
        initSensors: initSensors,
        printFile: printFile,
        sensorsWithTime: sensorsWithTime,
        show: show
    };
}());
