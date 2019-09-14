function extVal(value) {
    let val = value === "null" ? null : value;

    return !isNaN(val) ? parseInt(val, 10) : val;
}

module.exports = {
    extVal: extVal
};
