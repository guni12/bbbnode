const rpio = require('rpio');

module.exports = (function () {
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

    return {
        initPins: initPins
    };
}());
