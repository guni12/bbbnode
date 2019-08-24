module.exports = (function () {
    function updateList(list, item) {
        list.forEach((one, index) => {
            if (one.gpio === item.gpio) {
                list[index] = item;
            }
        });
        return list;
    }


    return {
        updateList: updateList
    };
}());
