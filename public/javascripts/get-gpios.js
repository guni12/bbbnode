const fs = require('fs');

module.exports = (function () {
    function getall(req, res) {
        let myfile = __dirname + '/../scripts/gpiodetails.txt';

        fs.readFile(myfile, (err, data) => {
            if (err) {
                throw err;
            }
            //console.log(JSON.parse(data), "Parsat");
            return res.json(JSON.parse(data));
        });
    }

    return {
        getall: getall
    };
}());
