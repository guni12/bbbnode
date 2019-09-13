const spi = require('./makeSpotInfo');

async function hubinfo(req, res, next) {
    try {
        await spi.makeSpotInfo(req);
    } catch (err) {
        //console.log("Error i hubinfo", err);
        next(err);
    }
}

module.exports = {
    hubinfo: hubinfo
};
