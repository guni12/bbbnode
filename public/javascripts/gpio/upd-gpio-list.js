const th = require('../throw');
const ci = require('./changeItem');

module.exports = (function () {
    async function updateList(req, res, next, params) {
        let list, item;

        try {
            if (req[params.list] && req[params.item]) {
                list = JSON.parse(req[params.list]);
                item = req[params.item];

                await ci.changeItem(list, item, req);
            } else {
                let text = 'Lista eller gpio-data saknas';
                let obj = th.throwerror("SyntaxError", 400, "gpio/upd-gpio-list", text, params);

                throw { obj, error: new Error() };
            }
        } catch (err) {
            next(err);
            //console.error('Invalid JSON', er);
            let text = 'Invalid JSON';
            let obj = th.throwerror("SyntaxError", 400, "gpio/upd-gpio-list", text, params);

            throw { obj, error: new Error() };
        }
    }


    return {
        updateList: updateList
    };
}());

