const sinon = require("sinon");

function room2() {
    return {
        id: 4,
        sensor: '28-0214672d0cff',
        name: null,
        tempis: 21.19,
        measured: '2019-08-10 09:30:01',
        gpio: 0,
        room: null,
        roomid: 2,
        should: 0,
        max: 0,
        min: 0,
        away: 0,
        dsm: 0,
        ison: null,
        isoff: null,
        roomname: 'Klicka för att hantera',
        mainroom: 0
    };
}

function room3() {
    return {
        id: 1,
        sensor: '28-021466fea4ff',
        name: null,
        tempis: 21.25,
        measured: '2019-08-10 09:30:01',
        gpio: 0,
        room: null,
        roomid: 3,
        should: 0,
        max: 0,
        min: 0,
        away: 0,
        dsm: 0,
        ison: null,
        isoff: null,
        roomname: 'Klicka för att hantera',
        mainroom: 0
    };
}

function testOneRoom() {
    return [room2()];
}

function testTwoRooms() {
    return [
        room2(),
        room3()
    ];
}

function sensorlist() {
    return [
        {
            "id": 1,
            "sensor": "28-021466fea4ff",
            "name": "Kök",
            "tempis": 21.25,
            "gpio": 3,
            "measured": "2019-08-10 09:30:01",
            "room": null,
            "main": null
        },
        {
            "id": 2,
            "sensor": "28-0214671137ff",
            "name": "Kök2",
            "tempis": 21.5,
            "gpio": 36,
            "measured": "2019-08-10 09:30:01",
            "room": null,
            "main": null
        },
        {
            "id": 3,
            "sensor": "28-0214671226ff",
            "name": "Sensor3",
            "tempis": 21.44,
            "gpio": 23,
            "measured": "2019-08-10 09:30:01",
            "room": null,
            "main": null
        }
    ];
}

function gpiosDataList() {
    return [ { id: 1, gpio: 3, status: 0, mode: 'out' },
        { id: 2, gpio: 5, status: 0, mode: 'out' },
        { id: 3, gpio: 7, status: 0, mode: 'out' },
        { id: 4, gpio: 8, status: 0, mode: 'out' },
        { id: 5, gpio: 10, status: 0, mode: 'out' },
        { id: 6, gpio: 11, status: 0, mode: 'out' },
        { id: 7, gpio: 12, status: 0, mode: 'out' },
        { id: 8, gpio: 13, status: 0, mode: 'out' },
        { id: 9, gpio: 15, status: 0, mode: 'out' },
        { id: 10, gpio: 16, status: 0, mode: 'out' },
        { id: 11, gpio: 18, status: 0, mode: 'out' },
        { id: 12, gpio: 19, status: 0, mode: 'out' },
        { id: 13, gpio: 21, status: 0, mode: 'out' },
        { id: 14, gpio: 22, status: 0, mode: 'out' },
        { id: 15, gpio: 23, status: 0, mode: 'out' },
        { id: 16, gpio: 24, status: 0, mode: 'out' },
        { id: 17, gpio: 26, status: 0, mode: 'out' },
        { id: 18, gpio: 29, status: 0, mode: 'out' },
        { id: 19, gpio: 31, status: 0, mode: 'out' },
        { id: 20, gpio: 32, status: 0, mode: 'out' },
        { id: 21, gpio: 33, status: 0, mode: 'out' },
        { id: 22, gpio: 35, status: 0, mode: 'out' },
        { id: 23, gpio: 36, status: 0, mode: 'out' },
        { id: 24, gpio: 37, status: 0, mode: 'out' },
        { id: 25, gpio: 38, status: 0, mode: 'out' },
        { id: 26, gpio: 40, status: 0, mode: 'out' } ];
}

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

function swtlist() {
    return [
        {"id": "28-021466fea4ff", "t": 21.25},
        {"id": "28-0214671137ff", "t": 21.5},
        {"id": "28-0214671226ff", "t": 21.44},
        {"id": "28-0214672d0cff", "t": 21.19},
        {"id": "28-02146745baff", "t": 21.44},
        {"id": "28-031466aef3ff", "t": 21.44},
        {"id": "28-031466ba20ff", "t": 21.56},
        {"id": "28-031466c1e7ff", "t": 21.38},
        {"time": "09:30:01", "date": "2019-08-10"}
    ];
}

function newsensors() {
    return [
        {"id": "28-02146745baff", "t": 21.44},
        {"id": "28-031466aef3ff", "t": 21.44},
        {"id": "28-031466ba20ff", "t": 21.56},
        {"id": "28-031466c1e7ff", "t": 21.38},
        {time: '09:30:01', date: '2019-08-10'}
    ];
}


function swtsmall() {
    return [
        {"id": "28-021466fea4ff", "t": 21.25},
        {"id": "28-0214671137ff", "t": 21.5},
        {"id": "28-0214671226ff", "t": 21.44},
        {"id": "28-0214672d0cff", "t": 21.19},
        {"time": "09:30:01", "date": "2019-08-10"}
    ];
}

const mockResponse = () => {
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

const mockRequest = (f, lt, id=null, c=null) => ({
    file: f,
    printPins: lt,
    params: id,
    controls: c,
    show: c,
    body: c,
    rooms: c,
    gpios: c,
    stat: c
});


let mochaAsync = (fn) => {
    return done => {
        fn.call().then(done, err => {
            done(err);
        });
    };
};


function makeid() {
    let text = "";

    for (var i = 0; i < 5; i++) {
        let nr = Math.floor(Math.random() * 26);

        text += getrandom(nr);
    }
    return text;
}

function getrandom(nr) {
    let possible = "abcdefghijklmnopqrstuvwxyz";

    return possible.charAt(nr);
}

function controlslist() {
    return [
        0, 0, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 2, 2, 1, 1, 1, 0
    ];
}

module.exports = {
    gpiolist: gpiolist,
    mockResponse: mockResponse,
    mockRequest: mockRequest,
    mochaAsync: mochaAsync,
    makeid: makeid,
    swtlist: swtlist,
    gpiosDataList: gpiosDataList,
    testOneRoom: testOneRoom,
    testTwoRooms: testTwoRooms,
    controlslist: controlslist,
    sensorlist: sensorlist,
    newsensors: newsensors,
    swtsmall: swtsmall
};
