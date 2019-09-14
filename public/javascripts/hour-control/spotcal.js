const extract = require('./extractControls');
const ct = require('../currtime');

async function tocontrol(req, res, next) {
    let isaway = false;
    let date = ct.date;

    if (req.settings.awayfrom !== null &&
        req.settings.awayto !== null
        && req.settings.awayto > date) {
        isaway = true;
    }
    await extract.extractControls(req, res, next, isaway);
}

module.exports = {
    tocontrol: tocontrol
};
