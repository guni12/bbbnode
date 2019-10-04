const rpio = require('rpio');

async function contactRpioOut(obj) {
    rpio.open(obj.gpio, rpio.OUTPUT, obj.status);
    rpio.write(obj.gpio, obj.status);
    return rpio.read(obj.gpio);
}


async function contactRpioIn(obj) {
    rpio.open(obj.gpio, rpio.INPUT);
    return rpio.read(obj.gpio);
}

module.exports = {
    contactRpioOut: contactRpioOut,
    contactRpioIn: contactRpioIn
};
