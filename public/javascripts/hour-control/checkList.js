const ft = require('./falseOrTrue');

module.exports = (function () {
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
        checkList: checkList
    };
}());
