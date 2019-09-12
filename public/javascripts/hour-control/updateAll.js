const m = require('./controls');
const updl = require('./update-pins');
const th = require('../throw');

module.exports = (function () {
    async function updateAll(req, res, next, par) {
        //console.log("I updateAll", req.zones);
        //console.log(req.prepGpiodetails, typeof(req.prepGpiodetails));
        let list = JSON.parse(req.prepGpiodetails);

        Promise.all(req.zones.map(async (item, index) => {
            let status = m[par.key](item);
            let what = index === (req.zones.length-1) ? 'gpiodetails' : null;
            //console.log("I updateAll", key, item, status);
            let params = { list: list, status: status, gpio: item.gpio, what: what };

            try {
                if (item.gpio === 0) {
                    let text = "Gpio pinne måste knytas till varje zon";
                    let obj = th.throwerror("Error", 500, "/updateAll." + index, text);

                    throw { obj, error: new Error() };
                } else {
                    await updl.updateList(req, res, next, params);
                }
            } catch (err) {
                next(err);
                //console.log("updateOne err: ", err);
            }
        }))
            .catch(function(err) {
                //console.log("updateAll error", err.message);
                next(err);
            });
    }

    return {
        updateAll: updateAll
    };
}());
