const csv = require('fast-csv');
const headers = require('./headers');

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

module.exports = {
    makeparser: makeparser
};
