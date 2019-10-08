const si = require('./spotinfo');
const th = require('../throw');
const wf = require('./whichfile');

async function makeSpotInfo(req) {
    let file = await wf.whichFile(req);

    try {
        await si.collectInfo(file, req);
    } catch (err) {
        //console.log(err);
        let text = "Problem att utvinna spotpriserna";
        let obj = th.throwerror("Error", 500, "makeSpotinfo", text, err);

        throw { obj, error: new Error() };
    }
}

module.exports = {
    makeSpotInfo: makeSpotInfo
};
