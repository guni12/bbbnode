function extVal(value) {
    let val = value === "null" ? null : value;

    return !isNaN(val) ? parseInt(val) : val;
}

module.exports = {
    extVal: extVal
};
