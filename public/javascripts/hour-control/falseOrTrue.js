const cc = require('./checkControl');

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

module.exports = {
    isFalse: isFalse,
    checkControl: checkControl
};
