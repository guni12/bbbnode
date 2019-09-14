const makelist = require('./hourList');
const adh = require('./addHeat');

async function extractControls(req, res, next, isaway) {
    let content = JSON.parse(req.content);
    let avg = content['Average'].replace(",", ".");

    avg = Math.round(avg * 10) / 100;
    let marker = (req.settings.percent/100)+1;
    let percon = req.settings.percenton === 0 ? true : false;
    let params = { data: content, marker: marker, avg: avg, isaway: isaway, percon: percon };

    try {
        let temp = await makelist.hourList(req, res, next, params);

        await adh.addHeat(temp, req, next);
    } catch (err) {
        //console.log("I extractC efter heat", err);
        next(err);
    }
}

module.exports = {
    extractControls: extractControls
};
