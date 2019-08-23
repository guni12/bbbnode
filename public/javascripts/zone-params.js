module.exports = (function () {
    function params(list, zone, when, i) {
        return [
            list[i].id,
            zone,
            0,
            0,
            0,
            list[i].t,
            null,
            null,
            0,
            0,
            0,
            'Namn',
            when
        ];
    }

    return {
        params: params
    };
}());
