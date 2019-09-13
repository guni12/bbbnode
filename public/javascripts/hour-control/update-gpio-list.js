const th = require('../throw');
const sh = require('./swopHere');

async function updateList(req, next, list, par) {
    let text = "Gpiodetaljer kan ej uppdateras, indata saknas";
    let obj = th.throwerror("Bad request", 400, "update-gpio-list", text);

    try {
        let len = (list.length)-1;

        if (len > 20 && par.toupdate) {
            await Promise.all(list.map(async (one, index) => {
                let params = {par: par, one: one, index: index, len: len};

                await sh.swopHere(req, list, params);
            }))
                .catch(function(err) {
                    next(err);
                });
        } else {
            throw { obj, error: new Error() };
        }
    } catch (err) {
        //console.log("I update-gpio-list err", err);
        next(err);
    }
}

module.exports = {
    updateList: updateList
};
