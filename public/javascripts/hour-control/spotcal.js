const extract = require('./extractControls');
const ct = require('../currtime');

async function tocontrol(req, res, next) {
    try {
        let isaway = false;
        let date = ct.date;

        if (req.settings.awayfrom !== null &&
            req.settings.awayto !== null
            && req.settings.awayto > date) {
            isaway = true;
        }
        await extract.extractControls(req, res, next, isaway);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    tocontrol: tocontrol
};
