const fs = require('fs');

module.exports = (function () {
    function show(req, res) {
        let what = req.params.id === 'control' ? req.controls : req.chosen;

        return res.json(what);
    }

    function spotdata(req, res) {
        let myfile = __dirname + '/../array.txt';

        fs.readFile(myfile, (err, data) => {
            if (err) {
                throw err;
            }
            return res.json(JSON.parse(data));
        });
    }

    return {
        show: show,
        spotdata: spotdata
    };
}());
