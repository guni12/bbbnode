const reg = require('../status');

module.exports = (function () {
    async function updateList(req, res, next, params) {
        let list, item;

        try {
            if (req[params.list] && req[params.item]) {
                list = JSON.parse(req[params.list]);
                item = req[params.item];

                await changeItem(list, item, req);
            } else {
                let text = 'Lista eller gpio-data saknas';
                let obj = reg.throwerror("SyntaxError", 400, "gpio/upd-gpio-list", text, params);

                throw { obj, error: new Error() };
            }
        } catch (err) {
            next(err);
            //console.error('Invalid JSON', er);
            let text = 'Invalid JSON';
            let obj = reg.throwerror("SyntaxError", 400, "gpio/upd-gpio-list", text, params);

            throw { obj, error: new Error() };
        }
    }

    async function changeItem(list, item, req) {
        return Promise.all(list.map(async (one, index) => {
            if (item.gpio && one.gpio === item.gpio) {
                //console.log("Ja changeItem", one);
                list[index] = item;
                req.newlist = list;
            }
        }));
    }


    return {
        updateList: updateList
    };
}());

