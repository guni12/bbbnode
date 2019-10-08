const th = require('../throw');
const cr = require('./contactRpio');

async function getstat(req, res, next, obj) {
    try {
        if (obj.mode === "out") {
            return await cr.contactRpioOut(obj);
        } else if (obj.mode === "in") {
            return await cr.contactRpioIn(obj);
        } else {
            //console.log("FEL i Update");
            let text = "mode saknas";
            let obj = th.throwerror("Error", 500, "update", text);

            throw { obj, error: new Error() };
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getstat: getstat
};
