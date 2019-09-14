const cc = require('./checkControl');

async function fixHeat(checks, temp) {
    return Promise.all(
        checks.map(async (one, i) => {
            if (one === "Here") {
                await cc.checkControl(temp, i);
            }
            if (checks.length - 1 === i) {
                return temp;
            }
        })
    );
}

module.exports = {
    fixHeat: fixHeat
};
