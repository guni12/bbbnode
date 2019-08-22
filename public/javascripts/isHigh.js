module.exports = (function () {
    function isHigh(list, data, key, marker, avg) {
        let tl = list;
        let price = data[key] === "" ? null : parseFloat(data[key]) / 10;

        if (price && ((price * marker) > avg)) {
            tl.push(1);
        } else if (price) {
            tl.push(0);
        }
        return tl;
    }

    return {
        isHigh: isHigh
    };
}());
