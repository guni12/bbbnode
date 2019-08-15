"use strict";

/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const fs = require('fs');
const rpio = require('rpio');
const sensor = require('ds18b20-raspi');
let writeFileStub;
let sensorStub;
const findSensors = require('../../../public/javascripts/find-sensors');

rpio.init({mock: 'raspi-3'});

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

const mockRequest = (f, lt) => ({
    file: f,
    printobj: lt,
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
            let check = "Error: Could not find any 1-Wire sensors to list";

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
                    res.body.errors.title.should.equal(check);
                    done();
                });
        });
    });

    describe("Test functions with stubs", () => {
        it("1. Test printFile", () => {
            const req = mockRequest(
                "gpiodetails.txt",
                gpiolist
            );

            let what = "";
            const url = "./public/scripts/gpiodetails.txt";
            const res = mockResponse();

            writeFileStub = sinon.stub(fs, 'writeFile')
                .returns("I am a fake call!");

            const spy = sinon.spy();

            writeFileStub.callsFake((firstArg) => {
                what = 'My first arg is: ' + firstArg;
            });

            findSensors.printFile(req, res, spy);

            writeFileStub.should.have.been.called;
            writeFileStub.should.have.been.calledWith(url, JSON.stringify(gpiolist));
            what.should.be.equal("My first arg is: " + url);
            spy.called.should.be.true;
            fs.writeFile.restore();
        });


        it("2. Test initSensors can't be done on windows", () => {
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
            spy.called.should.be.false;
            sensor.list.restore();
        });


        it("3. Test sensorsWithTime cant be done on windows", () => {
            sensorStub = sinon.stub(sensor, 'readAllC');
            const spy = sinon.spy();
            const res = mockResponse();
            const req = mockRequest(
                "",
                []
            );

            sensor.readAllC(2, (err, sensorlist));

            findSensors.sensorsWithTime(req, res, spy);

            sensorStub.should.have.been.called;
            sensorStub.should.have.been.calledWith(2, (err, sensorlist));
            spy.called.should.be.true;
            sensor.readAllC.restore();
        });
    });


    describe("Test function can be called", () => {
        it("1. Test show with simple content", () => {
            const res = mockResponse();
            const req = mockRequest(
                "",
                sensorlist
            );

            findSensors.show(req, res);
            res.json.should.have.been.called;
        });
    });
});
