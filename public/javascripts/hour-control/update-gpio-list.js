const reg = require('../status');

module.exports = (function () {
    async function updateList(req, next, list, par) {
        //console.log("typ list", typeof(list), list, par, par.toupdate);
        try {
            let len = list.length -1;

            if (len > 20 && par.toupdate) {
                await Promise.all(list.map(async (one, index) => {
                    let params = {par: par, one: one, index: index, len: len};

                    await swopHere(req, next, list, params);
                }));
            } else {
                let text = "Gpiodetaljer kan ej uppdateras, indata saknas";
                let obj = reg.throwerror("Bad request", 400, "update-gpio-list", text);

                throw { obj, error: new Error() };
            }
        } catch (err) {
            console.log("I update-gpio-list err", err);
            next(err);
        }
    }

    async function swopHere(req, next, list, params) {
        let which = 'gpio' + params.one.gpio;

        if (which === params.par.toupdate) {
            //console.log("Uppdaterat", which, req[params.par.toupdate]);
            list[params.index] = req[params.par.toupdate];
            if (params.par.what && params.index === params.len) {
                req[params.par.what] = list;
                //console.log("Ja", which, req[params.par.toupdate]);
            }
        }
    }


    return {
        updateList: updateList
    };
}());

