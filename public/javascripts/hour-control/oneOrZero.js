function oneOrZero(price, marker, avg) {
    return (price > (marker * avg)) ? 1 : 0;
}

module.exports = {
    oneOrZero: oneOrZero
};
