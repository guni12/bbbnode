module.exports = (function () {
    function throwerror(type, stat, where, text) {
        return {
            type: type,
            status: stat,
            source: where,
            message: text
        };
    }

    return {
        throwerror: throwerror
    };
}());
