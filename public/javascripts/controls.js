const rpio = require('rpio');
const update = require('./update-gpio');

module.exports = (function () {
    function c0(item) {
        let status = item.tempis < item.should ? 1 : 0;

        updatePin(item.gpio, status);

        return "I c0, normal:" + item.gpio + ": " + status;
    }

    function c1(item) {
        let status = item.tempis < item.min ? 1 : 0;

        updatePin(item.gpio, status);

        return "I c1, cold:" + item.gpio + ": " + status;
    }

    function c2(item) {
        let status = item.tempis < item.max ? 1 : 0;

        updatePin(item.gpio, status);

        return "I c2, warm:" + item.gpio + ": " + status;
    }

    function c3(item) {
        let status = item.tempis < item.away ? 1 : 0;

        updatePin(item.gpio, status);

        return "I c3, away:" + item.gpio + ": " + status;
    }

    function updatePin(gpio, status) {
        console.log(gpio, status);
        rpio.open(gpio, rpio.OUTPUT, status);
        rpio.write(gpio, status);
        status = rpio.read(gpio);

        let updated = { gpio: gpio, status: status, mode: 'out' };

        console.log(updated);

        update.updateFile(updated);
    }

    return {
        c0: c0,
        c1: c1,
        c2: c2,
        c3: c3
    };
}());
