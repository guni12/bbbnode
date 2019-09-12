const oz = require('./oneOrZero');

module.exports = (function () {
    function isHigh(key, params, next) {
        let data = params.data;

        try {
            let price = data[key] === "" ? null : parseFloat(data[key]) / 10;

            if (price) {
                return oz.oneOrZero(price, params.marker, params.avg);
            } else {
                return undefined;
            }
        } catch (err) {
            next(err);
        }
    }

    return {
        isHigh: isHigh
    };
}());

