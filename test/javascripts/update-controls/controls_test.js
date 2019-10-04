"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const controls = require('../../../public/javascripts/hour-control/controls');
const adh = require('../../../public/javascripts/hour-control/addHeat');
const cl = require('../../../public/javascripts/hour-control/checkLast');
const pf = require('../../../public/javascripts/printFile');
const rf = require('../../../public/javascripts/readFile');
const ev = require('../../../public/javascripts/extractValue');
const hp = require('../../helper.js');
const fs = require('fs').promises;

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

describe("Test controls", function() {
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

        it("2. Test printFile with nothing in req", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            const params = { where: './public/scripts/gpiodetails.txt', what: 'newlist' };

            //writeFileStub.yields( new Error("Testfel här"));
            await pf.printFile(req, res, spy, params);

            writeFileStub.should.not.have.been.called;
            spy.called.should.be.true;
        }));

        it("3. Test readFile with nothing in req", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            const params = {other: "Hej"};

            await rf.getFile(req, res, spy, params);
            spy.called.should.be.true;
        }));

        it("3. Test extVal with null", (done) => {
            let test = ev.extVal("null");

            test.should.eql(NaN);
            done();
        });

        it("4. Test checkLast when isaway is true", (done) => {
            let params = {isaway: true};
            let tocheck = hp.controlslist();
            let list = cl.checkLast(tocheck, params);

            list[3].should.eql(3);
            done();
        });

        it("4. Test checkLast when percon is true", (done) => {
            let params = {percon: true};
            let tocheck = hp.controlslist();

            tocheck[3].should.not.eql(0);
            let list = cl.checkLast(tocheck, params);

            list[3].should.eql(0);
            done();
        });
    });



    describe("Test affecting controls", () => {
        it("1. Test addHeat with controls", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const con = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0];
            const spy = sinon.spy();

            await adh.addHeat(con, req, spy);
            req.controls.should.be.an("array");
            spy.called.should.be.false;
        }));
    });
});
