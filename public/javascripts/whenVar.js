module.exports = (function () {
    function whenVar(obj) {
        return obj.date + " " + obj.time;
    }

    return {
        whenVar: whenVar
    };
}());
