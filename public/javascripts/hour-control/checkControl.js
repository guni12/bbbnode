async function checkControl(list, index) {
    list[index-1] = 2;
    if (index > 1) {
        list[index-2] = 2;
    }
    return list;
}

module.exports = {
    checkControl: checkControl
};
