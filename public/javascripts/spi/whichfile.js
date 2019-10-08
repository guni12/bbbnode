const path = require('path');
const fs = require('fs');

async function whichFile(req) {
    let d = new Date();
    let hour = d.getHours();
    let day1 = 'spotprice.txt';
    let filePath = path.join('scripts', 'spot', day1);
    let today = path.join(__dirname, '..', '..', filePath);

    if (req.params && req.params.id === '2' && hour >= 16) {
        let tomorrow = 'spotprice2.txt';

        filePath = path.join('scripts', 'spot', tomorrow);
        let tom = path.join(__dirname, '..', '..', filePath);

        await exist(tom, today);
    }
    return today;
}

async function exist(tomorrow, today) {
    fs.access(tomorrow, fs.F_OK, (err) => {
        if (err) {
            console.log(err);
            return today;
        }
    });
    return tomorrow;
}

module.exports = {
    whichFile: whichFile
};
