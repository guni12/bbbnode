module.exports = (function () {
    function addHeat(temp) {
        let check = false;

        for (let i = 0; i < temp.length; i++) {
            if (temp[i] === 1 && check === false) {
                if (i > 0) {temp[i-1] = 2;}
                if (i > 1) {temp[i-2] = 2;}
                check = true;
            }
            if (check === true && temp[i] === 0) {
                check = false;
            }
        }
        return temp;
    }

    return {
        addHeat: addHeat
    };
}());
