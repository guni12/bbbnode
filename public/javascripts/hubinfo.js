const spi = require('./makeSpotInfo');

module.exports = (function () {
    async function hubinfo(req, res, next) {
        try {
            await spi.makeSpotInfo(req);
        } catch (err) {
            //console.log("Error i hubinfo", err);
            next(err);
        }
    }

    return {
        hubinfo: hubinfo
    };
}());
