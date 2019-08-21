"use strict";

/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
//const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../../../app.js");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const fs = require('fs');
//let nock = require('nock');
const rpio = require('rpio');
let writeFileStub;
const updateGpio = require('../../../public/javascripts/update-gpio');

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

let mockRequest = (upd, lt, gt=null) => ({
    body: upd,
    updated: upd,
    list: lt,
    newlist: lt,
    gpiodetails: gt
});

let content = {
    gpio: 5,
    status: 1,
    mode: "out"
};

const smlist = [
    {"gpio": 3, "mode": "out", "status": 0},
    {"gpio": 5, "mode": "out", "status": 1},
    {"gpio": 7, "mode": "out", "status": 0}
];


const mockResponse = () => {
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

describe("Visit and update hourcontrols", function() {
    describe("GET /hourcontrol", () => {
        it("1. 500 rpio can't reach pins", (done) => {
            let check = "gpio out kunde inte läsas av";

            chai.request(server)
                .post("/rpio")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
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

        it("2. 500 rpio can't reach pins with mode in", (done) => {
            let check = "gpio in kunde inte läsas av";
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
                    res.body.errors.extra.should.be.an("object");
                    res.body.errors.title.should.equal(check);
                    done();
                });
        });
    });


    describe("Functions with filewriteStub", () => {
        it("1. Test WriteList", () => {
            const req = mockRequest(
                {},
                list,
                list
            );

            let what = "";
            let url = "./public/scripts/gpiodetails.txt";
            const res = mockResponse();

            writeFileStub = sinon.stub(fs, 'writeFile')
                .returns("I am a fake call!");

            writeFileStub.callsFake((firstArg) => {
                what = 'My first arg is: ' + firstArg;
            });

            updateGpio.writeList(req, res);

            writeFileStub.should.have.been.called;
            writeFileStub.should.have.been.calledWith(url, JSON.stringify(req.list));
            what.should.be.equal("My first arg is: ./public/scripts/gpiodetails.txt");
            res.status.should.have.been.calledWith(201);
            res.json.should.have.been.calledWith(list);
            fs.writeFile.restore();
        });


        it("2. Test writeList with nothing in req", () => {
            const req = mockRequest(
                null,
                null,
                null
            );

            const res = mockResponse();

            writeFileStub = sinon.stub(fs, 'writeFile')
                .returns("I am a fake call!");

            writeFileStub.yields( new Error("Testfel här"));
            updateGpio.writeList(req, res);

            writeFileStub.should.have.been.called;
            fs.writeFile.restore();
        });
    });


    describe("Functions with filereadStub", () => {
        it("1. Test readList with error", (done) => {
            const req = mockRequest(
                {},
                list,
                list
            );

            const res = mockResponse();
            const spy = sinon.spy();

            let readFileStub = sinon.stub(fs, 'readFile');

            readFileStub.yields( new Error("Testfel här"));
            updateGpio.readList(req, res, spy, "gpiodetails.txt");

            readFileStub.should.have.been.called;
            spy.called.should.be.false;
            fs.readFile.restore();
            done();
        });
    });


    describe("Functions with no req, res", () => {
        it("1. Test updateList", () => {
            const item = {"gpio": 5, "mode": "out", "status": 0};
            let test = updateGpio.updateList(item, smlist);

            test.should.be.an("array");
            test[1].should.be.equal(item);
        });


        it("2. Test updateFile", () => {
            const req = mockRequest(
                {},
                list,
                list
            );

            const res = mockResponse();
            const spy = sinon.spy();

            updateGpio.updateFile(req, res, spy, 'gpiodetails');
            spy.called.should.be.true;
        });


        it("3. Test updateList empty list with catch", () => {
            let empty = null;

            sinon.spy(updateGpio, "updateList");

            try {
                updateGpio.updateList(content, empty);
                //test.should.throws(() => x.y.z, TypeError);
            } catch (err) {
                err.should.include(new TypeError("Cannot read property 'forEach' of null"));
            }
        });


        it("4. Test updateInLoop empty list with catch", () => {
            const updated = {"gpio": 7, "mode": "in", "status": 0};
            let empty = null;
            const spy = sinon.spy(updateGpio, "updateInLoop");

            try {
                updateGpio.updateInLoop(updated, empty);
                spy.should.have.been.calledWith(updated, empty);
            } catch (err) {
                err.should.include(new TypeError("Cannot read property 'forEach' of null"));
            }
            updateGpio.updateInLoop.restore();
        });
    });
});
