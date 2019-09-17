"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const fs = require('fs').promises;
const rpio = require('rpio');
const sensor = require('ds18b20-raspi');
let writeFileStub;
let sensorStub;
const findSensors = require('../../../public/javascripts/sensors/find-sensors');
const swt = require('../../../public/javascripts/sensors/sensorsWithTime');
const pf = require('../../../public/javascripts/printFile');

rpio.init({mock: 'raspi-3'});

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

let mochaAsync = (fn) => {
    return done => {
        fn.call().then(done, err => {
            done(err);
        });
    };
};

const mockRequest = (f, lt, id=null, c=null) => ({
    file: f,
    printPins: lt,
    params: id,
    controls: c,
    show: c
});

let gpiolist = [
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

const sensorlist = [
    "28-021466fea4ff",
    "28-0214671137ff",
    "28-0214671226ff",
    "28-0214672d0cff",
    "28-02146745baff",
    "28-031466aef3ff",
    "28-031466ba20ff",
    "28-031466c1e7ff"];

let swtlist = [
    {"id": "28-021466fea4ff", "t": 21.25},
    {"id": "28-0214671137ff", "t": 21.5},
    {"id": "28-0214671226ff", "t": 21.44},
    {"id": "28-0214672d0cff", "t": 21.19},
    {"id": "28-02146745baff", "t": 21.44},
    {"id": "28-031466aef3ff", "t": 21.44},
    {"id": "28-031466ba20ff", "t": 21.56},
    {"id": "28-031466c1e7ff", "t": 21.38},
    {"time": "09:30:01", "date": "2019-08-10"}];

const err = new Error('something weird');

const mockResponse = () => {
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};


describe("Find and store all sensors", function() {
    describe("GET /find", () => {
        it("1. 500 rpio can't reach pins", (done) => {
            let check = "Could not find any 1-Wire sensors to list";

            chai.request(server)
                .get("/find")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log(res.body);
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.errors[0].message.should.equal(check);
                    done();
                });
        });
    });


    describe("Test function with writefileStub", () => {
        it("1. Test writeFile", mochaAsync(async () => {
            const req = mockRequest(
                "gpiodetails.txt",
                gpiolist
            );

            let what = "";
            const url = "./public/scripts/gpiodetails.txt";
            const res = mockResponse();
            const params = { where: './public/scripts/gpiodetails.txt', what: 'printPins' };

            const spy = sinon.spy();

            writeFileStub = sinon.stub(fs, 'writeFile')
                .returns("I am a fake call!");
            writeFileStub.callsFake((firstArg) => {
                what = 'My first arg is: ' + firstArg;
                //console.log(what);
            });

            await pf.printFile(req, res, spy, params).catch(error => console.error(error));

            writeFileStub.should.have.been.called;
            writeFileStub.should.have.been.calledWith(url, JSON.stringify(gpiolist));
            what.should.be.equal("My first arg is: " + url);
            spy.called.should.be.false;
            fs.writeFile.restore();
        }));
    });



    describe("Test functions with stubs", () => {
        it("1. Test initSensors can't be done on windows", (done) => {
            sensorStub = sinon.stub(sensor, 'list');
            const spy = sinon.spy();
            const res = mockResponse();
            const req = mockRequest(
                "",
                []
            );

            sensor.list(
                err, sensorlist);

            findSensors.initSensors(req, res, spy);

            sensorStub.should.have.been.called;
            sensorStub.should.have.been.calledWith(err, sensorlist);
            spy.called.should.be.true;
            sensor.list.restore();
            done();
        });


        it("2. Test initSensors with stub and list", (done) => {
            sensorStub = sinon.stub(sensor, 'list');
            sensorStub.returns(sensorlist);
            const spy = sinon.spy();
            const res = mockResponse();
            const req = mockRequest(
                "",
                []
            );

            findSensors.initSensors(req, res, spy);

            sensorStub.should.have.been.called;
            spy.called.should.be.false;
            req.printSensors.should.be.an("array");
            sensor.list.restore();
            sensorStub.restore();
            done();
        });


        it("3. Test initSensors with stub and list", (done) => {
            sensorStub = sinon.stub(sensor, 'list');
            sensorStub.returns([]);
            const spy = sinon.spy();
            const res = mockResponse();
            const req = mockRequest(
                "",
                []
            );

            findSensors.initSensors(req, res, spy);

            sensorStub.should.have.been.called;
            spy.called.should.be.true;
            sensor.list.restore();
            done();
        });


        it("4. Test sensorsWithTime cant be done on windows", mochaAsync(async () => {
            sensorStub = sinon.stub(sensor, 'readAllC');
            const spy = sinon.spy();
            const res = mockResponse();
            const req = mockRequest(
                "",
                []
            );

            sensor.readAllC(2, (err, sensorlist));

            await swt.sensorsWithTime(req, res, spy);

            sensorStub.should.have.been.called;
            sensorStub.should.have.been.calledWith(2, (err, sensorlist));
            spy.called.should.be.true;
            sensor.readAllC.restore();
        }));


        it("5. Test sensorsWithTime with stubbed values", mochaAsync(async () => {
            sensorStub = sinon.stub(sensor, 'readAllC');
            sensorStub.withArgs(2).returns(swtlist);
            const spy = sinon.spy();
            const res = mockResponse();
            const req = mockRequest(
                "",
                []
            );

            sensor.readAllC(2, (err, sensorlist));

            await swt.sensorsWithTime(req, res, spy);

            sensorStub.should.have.been.called;
            req.content.should.be.an("array");
            spy.called.should.be.false;
            sensor.readAllC.restore();
        }));


        it("6. Test sensorsWithTime with flawed stubbed values", mochaAsync(async () => {
            sensorStub = sinon.stub(sensor, 'readAllC');
            sensorStub.withArgs(2).returns([]);
            const spy = sinon.spy();
            const res = mockResponse();
            const req = mockRequest(
                "",
                []
            );

            sensor.readAllC(2, (err, sensorlist));

            await swt.sensorsWithTime(req, res, spy);

            sensorStub.should.have.been.called;
            spy.called.should.be.true;
            sensor.readAllC.restore();
        }));
    });
});
