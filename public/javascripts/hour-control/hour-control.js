const one = require('./updateOne');
const all = require('./updateAll');

module.exports = (function () {
    async function update(req, res, next, params) {
        let d = new Date();
        let hour = d.getHours();
        let control = JSON.parse(req.controls)[(hour-1)];
        let key = 'c' + control;
        let par = { params: params, key: key };
        //console.log(hour, req.controls, control, key);

        try {
            req.params.id ?
                await one.updateOne(req, res, next, par) :
                await all.updateAll(req, res, next, par);
        } catch (err) {
            console.log("I hour-control, err");
            next(err);
        }
    }


    return {
        update: update
    };
}());

