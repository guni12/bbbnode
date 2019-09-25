const oz = require('./oneOrZero');

function isHigh(key, params, next) {
    let data = params.data;

    try {
        let price = data[key] === "" ? null : parseFloat(data[key]) / 10;

        if (price) {
            return oz.oneOrZero(price, params.marker, params.avg);
        }
        return undefined;
    } catch (err) {
        next(err);
        return undefined;
    }
}

module.exports = {
    isHigh: isHigh
};
