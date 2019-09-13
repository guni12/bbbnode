async function checkControl(list, index, next) {
    try {
        list[index-1] = 2;
        if (index > 1) {
            list[index-2] = 2;
        }
        return list;
    } catch (err) {
        next(err);
    }
}

module.exports = {
    checkControl: checkControl
};
