async function findnew(req, res, next, what) {
    try {
        let temp = [];
        let exist;

        await Promise.all(req.content.map(async (one) => {
            exist = await containsObject(one, req.sensors, next);
            //console.log(exist, one.id);
            if (!exist) {
                temp.push(one);
            }
        }));
        //console.log("TILL SLUT", temp, len, index);
        await movelist(temp, req, what);
    } catch (err) {
        //console.log("findnew", err);
        next(err);
    }
}

async function movelist(list, req, what) {
    req[what] = list;
}


async function containsObject(obj, list, temp, next) {
    try {
        for (let i = 0; i < list.length; i++) {
            if (list[i].sensor === obj.id) {
                return true;
            }
        }
        return false;
    } catch (err) {
        //console.log("containsObject", err);
        next(err);
    }
}

module.exports = {
    findnew: findnew
};
