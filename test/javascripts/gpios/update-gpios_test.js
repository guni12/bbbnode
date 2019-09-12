"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
//const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../../../app.js");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const fs = require('fs').promises;
//let nock = require('nock');
const rpio = require('rpio');
const updl = require('../../../public/javascripts/gpio/upd-gpio-list');
const ul = require('../../../public/javascripts/hour-control/update-gpio-list');
const extract = require('../../../public/javascripts/hour-control/extractControls');
const cal = require('../../../public/javascripts/hour-control/spotcal');
const pf = require('../../../public/javascripts/printFile');
const rf = require('../../../public/javascripts/readFile');
const updin = require('../../../public/javascripts/gpio/upd-gpio-in');
const updout = require('../../../public/javascripts/gpio/upd-gpio-out');
let readFileStub;

rpio.init({mock: 'raspi-3'});

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

let list = [
    {"gpio": 3, "mode": "out", "status": 0},
    {"gpio": 5, "mode": "out", "status": 1},
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

let jsonlist = '[{"gpio":3,"status":0,"mode":"out"},{"gpio":5,"status":0,';

jsonlist += '"mode":"out"},{"gpio":7,"status":0,"mode":"out"},{"gpio":8,';
jsonlist += '"status":0,"mode":"out"},{"gpio":10,"status":0,"mode":"out"},';
jsonlist += '{"gpio":11,"status":0,"mode":"out"},{"gpio":12,"status":0,';
jsonlist += '"mode":"out"},{"gpio":13,"status":0,"mode":"out"},{"gpio":15,';
jsonlist += '"status":0,"mode":"out"},{"gpio":16,"status":0,"mode":"out"},';
jsonlist += '{"gpio":18,"status":0,"mode":"out"},{"gpio":19,"status":0,"mode":';
jsonlist += '"out"},{"gpio":21,"status":0,"mode":"out"},{"gpio":22,"status"';
jsonlist += ':0,"mode":"out"},{"gpio":23,"status":0,"mode":"out"},{"gpio":24,';
jsonlist += '"status":0,"mode":"out"},{"gpio":26,"status":0,"mode":"out"},';
jsonlist += '{"gpio":29,"status":0,"mode":"out"},{"gpio":31,"status":0,"mode"';
jsonlist += ':"out"},{"gpio":32,"status":0,"mode":"out"},{"gpio":33,"status"';
jsonlist += ':0,"mode":"out"},{"gpio":35,"status":0,"mode":"out"},{"gpio"';
jsonlist += ':36,"status":0,"mode":"out"},{"gpio":37,"status":0,"mode"';
jsonlist += ':"out"},{"gpio":38,"status":0,"mode":"out"},{"gpio":40,';
jsonlist += '"status":0,"mode":"out"}]';


let mockRequest = (upd, lt, gt=null) => ({
    body: upd,
    updated: upd,
    list: lt,
    newlist: lt,
    gpiodetails: lt,
    content: lt,
    settings: gt,
    gpio5: {"gpio": 5, "mode": "out", "status": 0},
    gpio40: {"gpio": 40, "mode": "out", "status": 1}
});

let content = {
    gpio: 5,
    status: 1,
    mode: "out"
};


let data = {
    "Year": "2019",
    "Date(dd.mm.yyyy)": "21.08.2019",
    "Area": "SE1",
    "Currency": "SEK",
    "Hour1": "356,24",
    "Hour2": "286,67",
    "Hour3A": "284,82",
    "Hour3B": "",
    "Hour4": "286,42",
    "Hour5": "303,96",
    "Hour6": "315,93",
    "Hour7": "403,20",
    "Hour8": "411,50",
    "Hour9": "424,21",
    "Hour10": "420,98",
    "Hour11": "409,34",
    "Hour12": "401,80",
    "Hour13": "394,26",
    "Hour14": "388,23",
    "Hour15": "386,18",
    "Hour16": "384,46",
    "Hour17": "387,48",
    "Hour18": "294,71",
    "Hour19": "298,36",
    "Hour20": "298,36",
    "Hour21": "398,14",
    "Hour22": "416,99",
    "Hour23": "393,94",
    "Hour24": "386,40",
    "Average": "388,02"
};
let settings = {
    "id": 1,
    "area": "SE1",
    "currency": "SEK",
    "dsmon": 0,
    "percenton": 0,
    "percent": 2,
    "awayfrom": null,
    "awayto": null
};


const mockResponse = () => {
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

let mochaAsync = (fn) => {
    return done => {
        fn.call().then(done, err => {
            done(err);
        });
    };
};

describe("Visit and update hourcontrols", function() {
    describe("GET /hourcontrol", () => {
        let writeFileStub;

        beforeEach(function () {
            writeFileStub = sinon.stub(fs, 'writeFile');
        });

        afterEach(function () {
            writeFileStub.restore();
        });

        it("1. 500 rpio can't reach pins", (done) => {
            let check = "Gpio pinne kunde ej kontaktas";

            chai.request(server)
                .post("/rpio")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log("1. 500 rpio", res.body);
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.errors[0].message.should.equal(check);
                    done();
                });
        });

        it("2. 500 rpio can't reach pins with mode in", (done) => {
            let check = "Gpio pinne kunde ej kontaktas";
            let incontent = {
                gpio: 11,
                status: 0,
                mode: "in"
            };


            chai.request(server)
                .post("/rpio")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(incontent)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log(res.body);
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.errors[0].message.should.be.an("string");
                    res.body.errors[0].message.should.equal(check);
                    done();
                });
        });
    });


    describe("Functions with filewriteStub", () => {
        let writeFileStub;

        beforeEach(function () {
            writeFileStub = sinon.stub(fs, 'writeFile');
        });

        afterEach(function () {
            writeFileStub.restore();
        });

        it("1. Test WriteList", mochaAsync(async () => {
            const req = mockRequest(
                {},
                list,
                settings
            );

            let what = "";
            let url = "./public/scripts/gpiodetails.txt";
            const res = mockResponse();
            const params = { where: './public/scripts/gpiodetails.txt', what: 'newlist' };
            const spy = sinon.spy();

            writeFileStub.callsFake((firstArg) => {
                what = 'My first arg is: ' + firstArg;
            });

            await pf.printFile(req, res, spy, params);

            writeFileStub.should.have.been.called;
            writeFileStub.should.have.been.calledWith(url, JSON.stringify(req.list));
            what.should.be.equal("My first arg is: ./public/scripts/gpiodetails.txt");
            spy.called.should.be.false;
        }));


        it("2. Test writeList with nothing in req", mochaAsync(async () => {
            const req = mockRequest(
                null,
                null,
                null
            );

            const res = mockResponse();
            const spy = sinon.spy();
            const params = { where: './public/scripts/gpiodetails.txt', what: 'newlist' };

            //writeFileStub.yields( new Error("Testfel här"));
            await pf.printFile(req, res, spy, params);

            writeFileStub.should.not.have.been.called;
            spy.called.should.be.true;
            writeFileStub.restore();
        }));
    });


    describe("Functions with filereadStub", () => {
        it("1. Test readFile with error", mochaAsync(async () => {
            const req = mockRequest(
                {},
                list,
                settings
            );

            const res = mockResponse();
            const spy = sinon.spy();

            readFileStub = sinon.stub(fs, 'readFile');
            let params = { where: "./public/scripts/gpiodetailss.txt" };

            //readFileStub.yields( new Error("Testfel här"));
            rf.getFile(req, res, spy, params);

            readFileStub.should.not.have.been.called;
            spy.called.should.be.true;
            fs.readFile.restore();
            readFileStub.restore();
        }));

        it("2. Test updateList i gpio", mochaAsync(async () => {
            const req = mockRequest(
                content,
                jsonlist
            );
            const res = mockResponse();
            const spy = sinon.spy();
            const updateParams = { item: 'updated', list: 'content' };

            await updl.updateList(req, res, spy, updateParams);

            spy.called.should.be.false;
        }));


        it("3. Test updateList empty list with catch", mochaAsync(async () => {
            const req = mockRequest(
                {},
                null,
                null
            );

            const res = mockResponse();
            const spy = sinon.spy();

            sinon.spy(updl, "updateList");
            let params = {item: '', list: ''};

            try {
                updl.updateList(req, res, spy, params);
            } catch (err) {
                err.should.include(new TypeError("Cannot read property 'forEach' of null"));
            }
        }));


        it("4. Test updateList i hour-control", mochaAsync(async () => {
            const req = mockRequest(
                {},
                list,
                settings
            );

            const spy = sinon.spy();
            const par = {"toupdate": 'gpio5' };

            ul.updateList(req, spy, list, par);

            spy.called.should.be.false;
        }));


        it("5. Test updateList i hour-control, last item", mochaAsync(async () => {
            const req = mockRequest(
                {},
                list,
                settings
            );

            const spy = sinon.spy();
            const par = {"toupdate": 'gpio40', what: 'newlist' };

            ul.updateList(req, spy, list, par);
            req.list[25].status.should.eql(1);
            req.list[25].gpio.should.eql(40);
            spy.called.should.be.false;
        }));


        it("6. Test updateList i hour-control, no list", mochaAsync(async () => {
            const req = mockRequest(
                {},
                []
            );

            const spy = sinon.spy();
            const par = { what: 'newlist' };

            ul.updateList(req, spy, list, par);
            console.log(req);
            spy.called.should.be.true;
        }));


        it("7. Extract Controls list where no control", mochaAsync(async () => {
            const spy = sinon.spy();

            const req = mockRequest(
                {},
                JSON.stringify(data),
                settings
            );
            const res = mockResponse();

            await extract.extractControls(req, res, spy, false);
            req.controls.should.be.an("array");
            req.controls[10].should.be.equal(0);
            spy.called.should.be.false;
        }));


        it("8. Extract Controls list when away", mochaAsync(async () => {
            settings.percenton = 1;
            const spy = sinon.spy();

            const req = mockRequest(
                {},
                JSON.stringify(data),
                settings
            );
            const res = mockResponse();

            await extract.extractControls(req, res, spy, true);

            req.controls.should.be.an("array");
            req.controls[10].should.be.equal(3);
            spy.called.should.be.false;
        }));


        it("9. Make control when away", mochaAsync(async () => {
            const req = mockRequest(
                {},
                list,
                settings
            );
            const res = mockResponse();
            const spy = sinon.spy();

            req.settings.awayfrom = "2";
            req.settings.awayto = "4";

            cal.tocontrol(req, res, spy);

            spy.called.should.be.false;
        }));
    });

    describe("Functions with rpioStub", () => {
        let rpioOpenStub, rpioReadStub;

        beforeEach(function () {
            rpioOpenStub = sinon.stub(rpio, 'open');
            rpioReadStub = sinon.stub(rpio, 'read');
            rpioReadStub.withArgs(5).returns(content);
        });

        afterEach(function () {
            rpioOpenStub.restore();
            rpioReadStub.restore();
        });

        it("1. Test gpio-in with stub", mochaAsync(async () => {
            const req = mockRequest(
            );
            const res = mockResponse();
            const spy = sinon.spy();

            await updin.updIn(req, res, spy, content);

            spy.called.should.be.false;
        }));


        it("2. Test gpio-out with stub", mochaAsync(async () => {
            const req = mockRequest(
            );
            const res = mockResponse();
            const spy = sinon.spy();

            await updout.updOut(req, res, spy, content);

            spy.called.should.be.false;
        }));
    });
});
