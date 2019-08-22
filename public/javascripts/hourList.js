const ish = require('./isHigh');

module.exports = (function () {
    function hourList(data, marker, avg) {
        let temp = [];

        for (let i = 1; i < 26; i++) {
            let key = i < 3 ? 'Hour' + i : 'Hour' + (i-1);

            if (i === 3) {
                key = 'Hour' + i + 'A';
                temp = ish.isHigh(temp, data, key, marker, avg);
            } else if (i === 4) {
                key = 'Hour' + (i-1) + 'B';
                temp = ish.isHigh(temp, data, key, marker, avg);
            } else {
                temp = ish.isHigh(temp, data, key, marker, avg);
            }
        }
        return temp;
    }

    return {
        hourList: hourList
    };
}());
