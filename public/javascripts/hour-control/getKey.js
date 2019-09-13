function getKey(index) {
    if (index < 3) {
        return 'Hour' + index;
    } else if (index === 3) {
        return 'Hour3A';
    } else if (index === 4) {
        return 'Hour3B';
    } else {
        return 'Hour' + (index-1);
    }
}

module.exports = {
    getKey: getKey
};
