module.exports = (function () {
    function checkControl(list, index) {
        list[index-1] = 2;
        if (index > 1) {
            list[index-2] = 2;
        }
        return list;
    }

    function isFalse(control, temp, i) {
        if (control === 1) {
            temp = checkControl(temp, i);
            return true;
        }
    }

    function isTrue(control) {
        return control === 0 ? false : true;
    }

    return {
        isFalse: isFalse,
        isTrue: isTrue
    };
}());
