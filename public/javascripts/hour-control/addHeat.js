const ft = require('./falseOrTrue');

module.exports = (function () {
    async function addHeat(temp, req, next) {
        let checks, newtemp = [];
        let place, second, again;

        try {
            checks = await checkList(temp, next);

            place = checks.indexOf(true);
            checks[place] = "Here";
            second = checks.indexOf(false, place);
            again = checks.indexOf(true, second);
            checks[again] = "Here";

            newtemp = await fixHeat(checks, temp, next);
            req.controls = newtemp[newtemp.length-1];
        } catch (err) {
            next(err);
        }
    }

    async function fixHeat(checks, temp, next) {
        return Promise.all(
            checks.map(async (one, i) => {
                if (one === "Here") {
                    await ft.isFalse(temp, i, next);
                }
                if (checks.length - 1 === i) {
                    return temp;
                }
            })
        );
    }

    async function checkList(temp, next) {
        let check = false;

        return Promise.all(
            temp.map(async (one) => {
                check = await ft.checkControl(one, next);
                return check;
            })
        );
    }

    return {
        addHeat: addHeat
    };
}());

