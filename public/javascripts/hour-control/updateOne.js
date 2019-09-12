const m = require('./controls');
const updl = require('./update-pins');
const th = require('../throw');

module.exports = (function () {
    async function updateOne(req, res, next, par) {
        let list = JSON.parse(req.prepGpiodetails);
        let status = m[par.key](req.zones);
        let gpar = { list: list, status: status, gpio: req.zones.gpio, what: par.params.what };

        try {
            if (req.zones.gpio === 0) {
                let text = "Gpio pinne måste knytas till varje zon";
                let obj = th.throwerror("Error", 500, "/updateOne", text);

                throw { obj, error: new Error() };
            } else {
                await updl.updateList(req, res, next, gpar);
            }
        } catch (err) {
            next(err);
            //console.log("updateOne err: ", err);
        }
    }

    return {
        updateOne: updateOne
    };
}());

