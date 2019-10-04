const th = require('../throw');
const fg = require('./fillGpioList');

async function initPins(req, res, next) {
    let gpiolist = [];

    try {
        gpiolist = await fg.fillGpioList(gpiolist);

        if (gpiolist.length > 0) {
            req.printPins = gpiolist;
        } else {
            let text = "Could not find any 1-Wire sensors to list";
            let obj = th.throwerror("Error", 500, "initPins", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        //console.log("I initPins", err);
        next(err);
    }
}

module.exports = {
    initPins: initPins
};
