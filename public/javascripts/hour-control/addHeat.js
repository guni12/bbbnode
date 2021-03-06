const fh = require('./fixHeat');
const cl = require('./checkList');

async function addHeat(temp, req, next) {
    let checks;
    let place, second, again;

    try {
        checks = await cl.checkList(temp);

        place = checks.indexOf(true);
        checks[place] = "Here";
        second = checks.indexOf(false, place);
        again = checks.indexOf(true, second);
        checks[again] = "Here";

        let newtemp = await fh.fixHeat(checks, temp);

        req.controls = newtemp[newtemp.length-1];
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addHeat: addHeat
};
