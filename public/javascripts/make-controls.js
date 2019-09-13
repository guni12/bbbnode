const spotcal = require('./hour-control/spotcal');

async function makeControls(req, res, next) {
    try {
        await spotcal.tocontrol(req, res, next);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    makeControls: makeControls
};
