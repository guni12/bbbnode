module.exports = (function () {
    function updateList(req, res, next, arr) {
        let list = req[arr[1]];
        let item = req[arr[0]];

        list.forEach((one, index) => {
            if (one.gpio === item.gpio) {
                list[index] = item;
            }
        });
        req.newlist = list;
        next();
    }


    return {
        updateList: updateList
    };
}());
