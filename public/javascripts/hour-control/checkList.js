const ft = require('./falseOrTrue');

async function checkList(temp, next) {
    let check = false;

    return Promise.all(
        temp.map(async (one) => {
            check = await ft.checkControl(one, next);
            return check;
        })
    );
}

module.exports = {
    checkList: checkList
};
