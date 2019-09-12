const si = require('./spotinfo');
const reg = require('./status');

module.exports = (function () {
    async function makeSpotInfo(req) {
        let d = new Date();
        let hour = d.getHours();
        let day = 'spotprice.txt';

        if (req.params) {
            if (req.params.id === '2' && hour > 16) {
                day = 'spotprice2.txt';
            }
        }
        let file = __dirname + '/../scripts/spot/' + day;

        try {
            await si.collectInfo(file, req);
        } catch (err) {
            let text = "Problem att utvinna spotpriserna";
            let obj = reg.throwerror("Error", 500, "makeSpotinfo", text, err);

            throw { obj, error: new Error() };
        }
    }

    return {
        makeSpotInfo: makeSpotInfo
    };
}());
