const fs = require('fs');

module.exports = (function () {
    function printChosen(req, res, next) {
        if (req.params.id === 'control') {
            next();
        } else {
            let arr = req.chosen;
            const file = fs.createWriteStream('./public/array.txt');

            file.on('error', function(err) { console.log(err); });
            file.write(JSON.stringify(arr));
            file.end();
            next();
        }
    }

    return {
        printChosen: printChosen
    };
}());
