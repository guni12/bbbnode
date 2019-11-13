function c0(item) {
    return oneOrZero(item.tempis, item.should);
}

function c1(item) {
    return oneOrZero(item.tempis, item.min);
}

function c2(item) {
    return oneOrZero(item.tempis, item.max);
}

function c3(item) {
    return oneOrZero(item.tempis, item.away);
}

function oneOrZero(c1, c2) {
    return c1 < c2 ? 0 : 1;
}

module.exports = {
    c0: c0,
    c1: c1,
    c2: c2,
    c3: c3
};
