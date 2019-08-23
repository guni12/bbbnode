module.exports = (function () {
    function show(req, res, what) {
        what = req.params && req.params.id === 'control' ? req.controls : req[what];

        return res.json(what);
    }

    return {
        show: show
    };
}());
