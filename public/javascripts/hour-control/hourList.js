const ish = require('./isHigh');

module.exports = (function () {
    function hourList(data, params) {
        let temp = [];
        let key;

        for (let i = 1; i < 3; i++) {
            key = 'Hour' + i;
            temp = ish.isHigh(temp, data, key, params);
        }
        key = 'Hour3A';
        temp = ish.isHigh(temp, data, key, params);
        key = 'Hour3B';
        temp = ish.isHigh(temp, data, key, params);
        for (let i = 5; i < 26; i++) {
            key = 'Hour' + (i-1);
            temp = ish.isHigh(temp, data, key, params);
        }
        return temp;
    }

    return {
        hourList: hourList
    };
}());
