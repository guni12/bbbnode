module.exports = (function () {
    function oneOrZero(price, marker, avg) {
        return price * marker > avg ? 1 : 0;
    }

    return {
        oneOrZero: oneOrZero
    };
}());
