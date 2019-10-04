const m = require('./controls');
const up = require('./updatePin');
const th = require('../throw');

async function updateAll(req, res, next, par) {
    let list = req.gpios;

    Promise.all(req.rooms.map(async (item, index) => {
        let status = m[par.key](item);
        let what = index === (req.rooms.length-1) ? 'gpiodetails' : null;
        //console.log("I updateAll", par.key, item, status);
        let params = { list: list, status: status, gpio: item.gpio, id: item.id, what: what };

        try {
            if (item.gpio === 0) {
                let text = "Gpio pinne måste knytas till varje zon";
                let obj = th.throwerror("Error", 500, "/updateAll." + index, text);

                throw { obj, error: new Error() };
            } else {
                await up.updatePin(req, res, next, params);
            }
        } catch (err) {
            next(err);
            //console.log("updateAll err: ", err);
        }
    }))
        .catch(function(err) {
            //console.log("updateAll error", err.message);
            next(err);
        });
}

module.exports = {
    updateAll: updateAll
};
