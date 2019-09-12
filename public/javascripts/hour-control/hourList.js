const ish = require('./isHigh');
const ch = require('./controlsHelper');

module.exports = (function () {
    async function hourList(req, res, next, params) {
        let temp = [];

        try {
            temp = await getList(temp, params, next);
            return await finishOff(temp, params);
        } catch (err) {
            //console.log.bind(console);
            next(err);
        }
    }

    async function finishOff(temp, params) {
        let filtered = temp.filter(function (el) {
            return el != null;
        });

        return ch.checkLast(filtered, params);
    }


    async function getList(temp, params, next) {
        let keyList = new Array(25).fill(0);

        return Promise.all(keyList.map(function (one, index) {
            one = ch.getKey(index+1);
            return temp[index] = ish.isHigh(one, params, next);
        }));
    }

    return {
        hourList: hourList
    };
}());

