module.exports = (function () {
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

    function throwerror(type, stat, where, text, extra = null) {
        return {
            type: type,
            status: stat,
            source: where,
            message: text,
            extra: extra
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

    /*
        sendError = (res, status, message) => error => {
      res.status(status || error.status).json({
        type: 'error',
        message: message || error.message,
        error
      })
    }

    function throwIf(fn, code, errorType, errorMessage) => result => {
        if (fn(result)) {
            return throwError(code, errorType, errorMessage)()
        }
        return result
    }*/

    return {
        reterror: reterror,
        retsuccess: retsuccess,
        throwerror: throwerror
    };
}());
