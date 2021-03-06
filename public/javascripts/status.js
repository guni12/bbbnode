function reterror(stat, where, text, extra = null) {
    return {
        errors: {
            status: stat,
            source: where,
            detail: text,
            message: text,
            extra: extra
        }
    };
}

function retsuccess(payload, token, text) {
    return {
        data: {
            type: "success",
            message: text,
            user: payload,
            token: token
        }
    };
}

module.exports = {
    reterror: reterror,
    retsuccess: retsuccess
};
