const sinon = require("sinon");

function gpiolist() {
    return [
        {"gpio": 3, "mode": "out", "status": 0},
        {"gpio": 5, "mode": "out", "status": 0},
        {"gpio": 7, "mode": "out", "status": 0},
        {"gpio": 8, "mode": "out", "status": 0},
        {"gpio": 10, "mode": "out", "status": 0},
        {"gpio": 11, "mode": "out", "status": 0},
        {"gpio": 12, "mode": "out", "status": 0},
        {"gpio": 13, "mode": "out", "status": 0},
        {"gpio": 15, "mode": "out", "status": 0},
        {"gpio": 16, "mode": "out", "status": 0},
        {"gpio": 18, "mode": "out", "status": 0},
        {"gpio": 19, "mode": "out", "status": 0},
        {"gpio": 21, "mode": "out", "status": 0},
        {"gpio": 22, "mode": "out", "status": 0},
        {"gpio": 23, "mode": "out", "status": 0},
        {"gpio": 24, "mode": "out", "status": 0},
        {"gpio": 26, "mode": "out", "status": 0},
        {"gpio": 29, "mode": "out", "status": 0},
        {"gpio": 31, "mode": "out", "status": 0},
        {"gpio": 32, "mode": "out", "status": 0},
        {"gpio": 33, "mode": "out", "status": 0},
        {"gpio": 35, "mode": "out", "status": 0},
        {"gpio": 36, "mode": "out", "status": 0},
        {"gpio": 37, "mode": "out", "status": 0},
        {"gpio": 38, "mode": "out", "status": 0},
        {"gpio": 40, "mode": "out", "status": 0}
    ];
}


const mockResponse = () => {
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

let mockRequest = (updated, list, gt=null) => ({
    updated: updated,
    list: list,
    settings: gt
});


let mochaAsync = (fn) => {
    return done => {
        fn.call().then(done, err => {
            done(err);
        });
    };
};

module.exports = {
    gpiolist: gpiolist,
    mockResponse: mockResponse,
    mockRequest: mockRequest,
    mochaAsync: mochaAsync
};
