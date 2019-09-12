module.exports = (function () {
    function getKey(index) {
        if (index < 3) {
            return 'Hour' + index;
        } else if (index === 3) {
            return 'Hour3A';
        } else if (index === 4) {
            return 'Hour3B';
        } else {
            return 'Hour' + (index-1);
        }
    }

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
        getKey: getKey,
        checkLast: checkLast
    };
}());
