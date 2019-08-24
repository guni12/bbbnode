const ft = require('./falseOrTrue');

module.exports = (function () {
    function addHeat(temp) {
        let check = false;

        for (let i = 1; i < temp.length; i++) {
            check = check === false ? ft.isFalse(temp[i], temp, i) : ft.isTrue(temp[i]);
        }
        return temp;
    }

    return {
        addHeat: addHeat
    };
}());
