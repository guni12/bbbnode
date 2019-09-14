const ft = require('./falseOrTrue');

async function checkList(temp) {
    let check = false;

    return Promise.all(
        temp.map(async (one) => {
            check = await ft.checkControl(one);
            return check;
        })
    );
}

module.exports = {
    checkList: checkList
};
