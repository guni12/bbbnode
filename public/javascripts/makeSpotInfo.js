const si = require('./spotinfo');
const th = require('./throw');

async function makeSpotInfo(req) {
    let d = new Date();
    let hour = d.getHours();
    let day = 'spotprice.txt';

    if (req.params && req.params.id === '2' && hour > 16) {
        day = 'spotprice2.txt';
    }
    let file = __dirname + '/../scripts/spot/' + day;

    try {
        await si.collectInfo(file, req);
    } catch (err) {
        let text = "Problem att utvinna spotpriserna";
        let obj = th.throwerror("Error", 500, "makeSpotinfo", text, err);

        throw { obj, error: new Error() };
    }
}

module.exports = {
    makeSpotInfo: makeSpotInfo
};
