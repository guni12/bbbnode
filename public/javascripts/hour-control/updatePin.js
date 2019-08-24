const rpio = require('rpio');

module.exports = (function () {
    function updatePin(gpio, status) {
        rpio.open(gpio, rpio.OUTPUT, status);
        rpio.write(gpio, status);
        status = rpio.read(gpio);
        let updated = { gpio: gpio, status: status, mode: 'out' };

        return updated;
    }

    return {
        updatePin: updatePin
    };
}());
