const spotcal = require('./hour-control/spotcal');
const si = require('./spotinfo');

module.exports = (function () {
    function hubinfo(req, res, next) {
        let d = new Date();
        let hour = d.getHours();

        if (req.params && req.params.id === 'control') {
            spotcal.tocontrol(req, res, next);
        } else {
            let f1 = 'spotprice2.txt';
            let day = req.params && req.params.id === '2' && hour > 16 ? f1 : 'spotprice.txt';
            let file = __dirname + '/../scripts/spot/' + day;

            si.spotinfo(req, res, next, file);
        }
    }

    return {
        hubinfo: hubinfo
    };
}());
