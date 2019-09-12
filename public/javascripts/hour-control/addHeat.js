const fh = require('./fixHeat');
const cl = require('./checkList');

module.exports = (function () {
    async function addHeat(temp, req, next) {
        let checks, newtemp = [];
        let place, second, again;

        try {
            checks = await cl.checkList(temp, next);

            place = checks.indexOf(true);
            checks[place] = "Here";
            second = checks.indexOf(false, place);
            again = checks.indexOf(true, second);
            checks[again] = "Here";

            newtemp = await fh.fixHeat(checks, temp, next);
            req.controls = newtemp[newtemp.length-1];
        } catch (err) {
            next(err);
        }
    }

    return {
        addHeat: addHeat
    };
}());

