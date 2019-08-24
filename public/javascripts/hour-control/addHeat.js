const cc = require('./checkControl');

module.exports = (function () {
    function addHeat(temp) {
        let check = false;

        for (let i = 1; i < temp.length; i++) {
            check = check === false ? cc.isFalse(temp[i], temp, i) : cc.isTrue(temp[i]);
        }
        return temp;
    }

    return {
        addHeat: addHeat
    };
}());
