async function swopHere(req, list, params) {
    let which = 'gpio' + params.one.gpio;

    if (which === params.par.toupdate) {
        //console.log("Uppdaterat", which, req[params.par.toupdate]);
        list[params.index] = req[params.par.toupdate];
    }
    if (params.par.what && params.index === params.len) {
        req[params.par.what] = list;
        //console.log("Ja", which, req[params.par.toupdate]);
    }
}

module.exports = {
    swopHere: swopHere
};
