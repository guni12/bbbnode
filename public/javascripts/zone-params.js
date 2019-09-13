function params(list, zone, when, i) {
    return [
        '"' + list[i].id + '"',
        '"' + zone + '"',
        0,
        0,
        0,
        list[i].t,
        0,
        0,
        0,
        `"Namn"`,
        '"' + when + '"'
    ];
}

module.exports = {
    params: params
};
