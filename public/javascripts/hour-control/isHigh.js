const oz = require('./oneOrZero');

module.exports = (function () {
    function isHigh(list, data, key, params) {
        let price = data[key] === "" ? null : parseFloat(data[key]) / 10;

        if (price) {
            list.push(oz.oneOrZero(price, params.marker, params.avg));
        }
        return list;
    }

    return {
        isHigh: isHigh
    };
}());
