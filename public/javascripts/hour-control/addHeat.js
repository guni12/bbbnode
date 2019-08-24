const cc = require('./checkControl');

module.exports = (function () {
    function addHeat(temp) {
        let check = false;

        for (let i = 1; i < temp.length; i++) {
            if (temp[i] === 1 && check === false) {
                temp = cc.checkControl(temp, i);
                check = true;
            }
            check = check === true && temp[i] === 0 ? false : check;
        }
        return temp;
    }

    return {
        addHeat: addHeat
    };
}());
