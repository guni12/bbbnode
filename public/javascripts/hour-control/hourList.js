const ish = require('./isHigh');
const gk = require('./getKey');
const cl = require('./checkLast');

async function hourList(req, res, next, params) {
    let temp = [];

    try {
        temp = await getList(temp, params, next);
        return await finishOff(temp, params);
    } catch (err) {
        next(err);
        return undefined;
    }
}

async function finishOff(temp, params) {
    let filtered = temp.filter(function (el) {
        return el !== null;
    });

    return cl.checkLast(filtered, params);
}


async function getList(temp, params, next) {
    let keyList = new Array(25).fill(0);

    return Promise.all(keyList.map(function (one, index) {
        one = gk.getKey(index+1);
        return temp[index] = ish.isHigh(one, params, next);
    }));
}

module.exports = {
    hourList: hourList
};
