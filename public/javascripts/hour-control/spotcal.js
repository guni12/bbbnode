const extract = require('./extractControls');

module.exports = (function () {
    function tocontrol(req, res, next) {
        let isaway = false;

        if (req.settings.awayfrom !== null && req.settings.awayto !== null) {
            isaway = true;
        }
        req.controls = extract.extractControls(req.content, req.settings, isaway);

        next();
    }

    return {
        tocontrol: tocontrol
    };
}());
