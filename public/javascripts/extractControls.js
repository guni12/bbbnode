module.exports = (function () {
    function extractControls(data, settings, isaway) {
        let temp = [];
        let avg = parseFloat(data['Average']) / 10;
        let marker = (settings.percent/10)+1;

        for (let i = 1; i < 26; i++) {
            let key = i < 3 ? 'Hour' + i : 'Hour' + (i-1);

            if (i === 3) {
                key = 'Hour' + i + 'A';
                temp = isHigh(temp, data, key, marker, avg);
            } else if (i === 4) {
                key = 'Hour' + (i-1) + 'B';
                temp = isHigh(temp, data, key, marker, avg);
            } else {
                temp = isHigh(temp, data, key, marker, avg);
            }
        }

        temp = addControl(temp);

        if (isaway) {
            temp.fill(3);
        }
        if (settings.percenton === 0) {
            temp.fill(0);
        }
        return temp;
    }

    function isHigh(list, data, key, marker, avg) {
        let tl = list;
        let price = data[key] === "" ? null : parseFloat(data[key]) / 10;

        if (price && ((price * marker) > avg)) {
            tl.push(1);
        } else {
            tl.push(0);
        }
        return tl;
    }

    function addControl(temp) {
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
        extractControls: extractControls
    };
}());
