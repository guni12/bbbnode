module.exports = (function () {
    function isHigh(list, data, key, arr) {
        let tl = list;
        let marker = arr[0];
        let avg = arr[1];
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
