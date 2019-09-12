module.exports = (function () {
    function asyncHandler(fn) {
        return async (req, res, next) => {
            try {
                await fn(req, res, next);
            } catch (err) {
                next(err);
            }
        };
    }

    return {
        asyncHandler: asyncHandler
    };
}());
