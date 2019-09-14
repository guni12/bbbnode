const cc = require('./checkControl');

async function isFalse(temp, i, next) {
    try {
        return await cc.checkControl(temp, i);
    } catch (err) {
        next(err);
    }
}

async function checkControl(control) {
    if (control === 1) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isFalse: isFalse,
    checkControl: checkControl
};
