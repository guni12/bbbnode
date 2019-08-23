const extract = require('./extractControls');

module.exports = (function () {
    function tocontrol(req, res, next) {
        let parsed = req.content;
        let isaway = false;

        if (req.settings.awayfrom !== null && req.settings.awayto !== null) {
            isaway = true;
        }
        let arr = extract.extractControls(parsed, req.settings, isaway);

        req.controls = arr;
        next();
    }

    return {
        tocontrol: tocontrol
    };
}());
