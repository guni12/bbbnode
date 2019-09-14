async function checkControl(control) {
    if (control === 1) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    checkControl: checkControl
};
