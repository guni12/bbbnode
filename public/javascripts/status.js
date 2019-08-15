module.exports = (function () {
    function reterror(stat, where, text, extra= null) {
        console.log(stat, where, text);
        return {
            errors: {
                status: stat,
                source: where,
                title: text,
                detail: text,
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

    return {
        reterror: reterror,
        retsuccess: retsuccess,
    };
}());
