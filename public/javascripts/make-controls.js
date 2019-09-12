const spotcal = require('./hour-control/spotcal');

module.exports = (function () {
    async function makeControls(req, res, next) {
        try {
            await spotcal.tocontrol(req, res, next);
        } catch (err) {
            next(err);
        }
    }

    return {
        makeControls: makeControls
    };
}());
