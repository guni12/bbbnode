module.exports = (function () {
    function c0(item) {
        let status = item.tempis < item.should ? 1 : 0;

        return status;
    }

    function c1(item) {
        let status = item.tempis < item.min ? 1 : 0;

        return status;
    }

    function c2(item) {
        let status = item.tempis < item.max ? 1 : 0;

        return status;
    }

    function c3(item) {
        let status = item.tempis < item.away ? 1 : 0;

        return status;
    }


    return {
        c0: c0,
        c1: c1,
        c2: c2,
        c3: c3
    };
}());
