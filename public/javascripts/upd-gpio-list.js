module.exports = (function () {
    function updateList(req, res, next, item, list) {
        let lst = req[list];
        let itm = req[item];

        lst.forEach((one, index) => {
            if (one.gpio === itm.gpio) {
                lst[index] = itm;
            }
        });
        req.newlist = lst;
        return lst;
    }


    return {
        updateList: updateList
    };
}());
