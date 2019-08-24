const makelist = require('./hourList');
const adh = require('./addHeat');

module.exports = (function () {
    function extractControls(data, settings, isaway) {
        let avg = parseFloat((data['Average'])) / 10;
        let marker = (settings.percent/10)+1;
        let params = { marker: marker, avg: avg };
        let temp = makelist.hourList(data, params);

        temp = adh.addHeat(temp);

        if (isaway) {
            temp.fill(3);
        }
        if (settings.percenton === 0) {
            temp.fill(0);
        }
        return temp;
    }

    return {
        extractControls: extractControls
    };
}());
