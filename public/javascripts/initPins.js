const rpio = require('rpio');
const reg = require('./status');

module.exports = (function () {
    async function initPins(req, res, next) {
        let gpiolist = [];
        let pins = [
            3, 5, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19,
            21, 22, 23, 24, 26, 29, 31, 32, 33, 35, 36, 37, 38, 40
        ];

        try {
            for (let i = 0; i < pins.length; i++) {
                rpio.open(pins[i], rpio.OUTPUT);
                rpio.write(pins[i], + rpio.LOW);
                let pin = rpio.read(pins[i]);
                let pinobj = {
                    gpio: pins[i],
                    status: pin,
                    mode: 'out'
                };

                if (pin) {gpiolist.push(pinobj);}
            }
            if (gpiolist.length > 0) {
                req.printPins = gpiolist;
            } else {
                let text = "Could not find any 1-Wire sensors to list";
                let obj = reg.throwerror("Error", 500, "initPins", text);

                throw { obj, error: new Error() };
            }
        } catch (err) {
            //console.log("I initPins", err);
            next(err);
        }
    }

    return {
        initPins: initPins
    };
}());
