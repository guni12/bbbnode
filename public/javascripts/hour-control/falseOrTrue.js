async function checkControl(control) {
    if (control === 1) {
        return true;
    }
    return false;
}

module.exports = {
    checkControl: checkControl
};
