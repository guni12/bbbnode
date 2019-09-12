module.exports = (function () {
    function checkLast(list, params) {
        if (params.isaway) {
            return list.fill(3);
        } else if (params.percon) {
            return list.fill(0);
        } else {
            return list;
        }
    }

    return {
        checkLast: checkLast
    };
}());
