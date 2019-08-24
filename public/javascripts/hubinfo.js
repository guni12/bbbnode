const spotcal = require('./hour-control/spotcal');
const spi = require('./makeSpotInfo');

module.exports = (function () {
    function hubinfo(req, res, next) {
        if (req.params && req.params.id === 'control') {
            spotcal.tocontrol(req, res, next);
        } else {
            spi.makeSpotInfo(req, res, next);
        }
    }

    return {
        hubinfo: hubinfo
    };
}());
