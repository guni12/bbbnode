module.exports = (function () {
    function isHigh(list, data, key, arr) {
        let tl = list;
        let marker = arr[0];
        let avg = arr[1];
        let price = data[key] === "" ? null : parseFloat(data[key]) / 10;

        if (price) {
            tl.push(oneOrZero(price, marker, avg));
        }
        return tl;
    }

    function oneOrZero(price, marker, avg) {
        return price * marker > avg ? 1 : 0;
    }

    return {
        isHigh: isHigh
    };
}());
