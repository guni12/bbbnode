const path = require('path');
const fs = require('fs');

async function whichFile(req) {
    let d = new Date();
    let hour = d.getHours();
    let day = 'spotprice.txt';
    let today = makepath(day);

    if (req.params && req.params.id === '2' && hour >= 16) {
        day = 'spotprice2.txt';
        let tomorrow = makepath(day);
        let check = exist(tomorrow);

        if (check) {
            return tomorrow;
        }
    }
    return today;
}

function makepath(day) {
    let filePath = path.join('scripts', 'spot', day);

    return path.join(__dirname, '..', '..', filePath);
}

function exist(tomorrow) {
    let flag = true;

    try {
        fs.accessSync(tomorrow, fs.F_OK);
    } catch (err) {
        flag = false;
    }
    return flag;
}

module.exports = {
    whichFile: whichFile
};
