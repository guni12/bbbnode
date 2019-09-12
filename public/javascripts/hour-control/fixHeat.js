const ft = require('./falseOrTrue');

module.exports = (function () {
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

    return {
        fixHeat: fixHeat
    };
}());
