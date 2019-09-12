module.exports = (function () {
    async function changeItem(list, item, req) {
        return Promise.all(list.map(async (one, index) => {
            if (item.gpio && one.gpio === item.gpio) {
                //console.log("Ja changeItem", one);
                list[index] = item;
                req.newlist = list;
            }
        }));
    }


    return {
        changeItem: changeItem
    };
}());

