const fs = require('fs');
const rpio = require('rpio');
const sensor = require('ds18b20-raspi');

module.exports = (function () {
    function getAllZones(req, res) {
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
        printFile(gpiolist, 'gpiodetails.txt');
        console.log(gpiolist);

        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        let timeoptions = {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };


        let d = new Date();
        let time = d.toLocaleTimeString('sv-SE', timeoptions);
        let date = d.toLocaleDateString('sv-SE', options);

        sensor.list((err, deviceIds) => {
            if (err) {
                console.log(err);
            } else {
                console.log(deviceIds);
                let f = './public/scripts/sensors.txt';

                deviceIds.push(time);
                deviceIds.push(date);
                fs.writeFile(f, JSON.stringify(deviceIds), function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log('Sparad');
                });
            }
        });

        sensor.readAllC(2, (err, temps) => {
            if (err) {
                console.log(err);
                return res.json(err);
            } else {
                let item = {time: time, date: date};

                temps.push(item);
                printFile(temps, 'sensordetails.txt');
                return res.json(temps);
            }
        });
    }



    function printFile(obj, file) {
        fs.writeFile('./public/scripts/' + file, JSON.stringify(obj), function (err) {
            if (err) {
                throw err;
            }
            console.log('Sparade till ', file);
        });
    }

    return {
        getAllZones: getAllZones
    };
}());
