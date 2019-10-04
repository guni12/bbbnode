const one = require('./updateOne');
const all = require('./updateAll');

async function update(req, res, next) {
    let d = new Date();
    let hour = d.getHours();
    let control = JSON.parse(req.controls)[(hour-1)];
    let key = 'c' + control;
    let par = { key: key };
    //console.log("I HOUR_CONTROL", hour, req.controls, control, key);

    try {
        req.params.id ?
            await one.updateOne(req, res, next, par) :
            await all.updateAll(req, res, next, par);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    update: update
};
