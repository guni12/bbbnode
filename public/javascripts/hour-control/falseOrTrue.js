const cc = require('./checkControl');

module.exports = (function () {
    function isFalse(control, temp, i) {
        if (control === 1) {
            temp = cc.checkControl(temp, i);
            return true;
        }
    }

    function isTrue(control) {
        return control === 0 ? false : true;
    }

    return {
        isFalse: isFalse,
        isTrue: isTrue
    };
}());
