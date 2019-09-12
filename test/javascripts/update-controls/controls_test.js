"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const rpio = require('rpio');
const controls = require('../../../public/javascripts/hour-control/controls');
//const hourcontrol = require('../../../public/javascripts/hour-control');
const adh = require('../../../public/javascripts/hour-control/addHeat');
const up = require('../../../public/javascripts/hour-control/update-pins');
const hp = require('../../helper.js');
const fs = require('fs').promises;


let mochaAsync = (fn) => {
    return done => {
        fn.call().then(done, err => {
            done(err);
        });
    };
};

const mockRequest = (f, lt) => ({
    file: f,
    printobj: lt,
    content: lt,
    gpiodetails: lt,
    prep_gpiodetails: lt
});

rpio.init({mock: 'raspi-3'});

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

describe("Test controls", function() {
    describe("GET /hourcontrol", () => {
        let writeFileStub;

        beforeEach(function () {
            writeFileStub = sinon.stub(fs, 'writeFile');
        });

        afterEach(function () {
            writeFileStub.restore();
        });

        it("1. 500 rpio can't reach pins", (done) => {
            let check = "Gpio pinne måste knytas till varje zon";

            chai.request(server)
                .get("/hourcontrol")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.errors[0].message.should.equal(check);
                    done();
                });
        });


        it("2. 500 rpio can't reach pins - though correct id", (done) => {
            let check = "Gpio pinne måste knytas till varje zon";

            chai.request(server)
                .get("/hourcontrol/3")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log("2. 500 rpio", res.body.errors[0].message);
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.errors[0].message.should.equal(check);
                    done();
                });
        });


        it("3. 400 rpio can't reach pins - with wrong id", (done) => {
            let check = "Detta id finns inte";

            chai.request(server)
                .get("/hourcontrol/13")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log(res.body);
                    res.should.have.status(400);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.errors[0].message.should.equal(check);
                    done();
                });
        });


        it("4. update-pins with stub", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            let list = hp.gpiolist();
            let params = {what: 'det', gpio: 5, status: 1, list: list};

            await up.updateList(req, res, spy, params);
            spy.called.should.be.false;
        }));
    });


    describe("Individual functions", () => {
        it("1. Test first control", () => {
            let item = {
                gpio: 5,
                should: 19,
                tempis: 22.4
            };
            let check = 0;
            let answer = controls.c0(item);

            answer.should.be.a("number");
            answer.should.be.equal(check);
        });


        it("2. Test second control", () => {
            let item = {
                gpio: 5,
                min: 14,
                tempis: 22.4
            };
            let check = 0;
            let answer = controls.c1(item);

            answer.should.be.a("number");
            answer.should.be.equal(check);
        });


        it("3. Test third control", () => {
            let item = {
                gpio: 5,
                max: 25,
                tempis: 22.4
            };
            let check = 1;
            let answer = controls.c2(item);

            answer.should.be.a("number");
            answer.should.be.equal(check);
        });


        it("4. Test fourth control", () => {
            let item = {
                gpio: 5,
                away: 19,
                tempis: 22.4
            };
            let check = 0;
            let answer = controls.c3(item);

            answer.should.be.a("number");
            answer.should.be.equal(check);
        });
    });


    describe("GET /controlupdate tests", () => {
        let writeFileStub;

        beforeEach(function () {
            writeFileStub = sinon.stub(fs, 'writeFile');
        });

        afterEach(function () {
            writeFileStub.restore();
        });

        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/controlupdate")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    res.should.have.status(200);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("string");
                    done();
                });
        });
    });



    describe("Test affecting controls", () => {
        it("1. Test addHeat with controls", mochaAsync(async () => {
            const req = mockRequest(
                "",
                []
            );
            const con = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0];
            const spy = sinon.spy();

            await adh.addHeat(con, req, spy);
            req.controls.should.be.an("array");
            spy.called.should.be.false;
        }));
    });
});
