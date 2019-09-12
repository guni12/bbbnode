const cc = require('./checkControl');

module.exports = (function () {
    async function isFalse(temp, i, next) {
        try {
            return await cc.checkControl(temp, i, next);
        } catch (err) {
            next(err);
        }
    }

    async function checkControl(control, next) {
        try {
            if (control === 1) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            next(err);
        }
    }

    return {
        isFalse: isFalse,
        checkControl: checkControl
    };
}());
