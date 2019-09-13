function throwerror(type, stat, where, text) {
    return {
        type: type,
        status: stat,
        source: where,
        message: text
    };
}

module.exports = {
    throwerror: throwerror
};
