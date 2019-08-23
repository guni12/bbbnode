const csv = require('fast-csv');
const headers = require('./headers');

module.exports = (function () {
    function makeparser() {
        let hs = headers.list;

        return csv.parse({
            comment: '#',
            strictColumnHandling: false,
            renameHeaders: false,
            headers: hs,
            delimiter: ';'
        });
    }

    return {
        makeparser: makeparser
    };
}());
