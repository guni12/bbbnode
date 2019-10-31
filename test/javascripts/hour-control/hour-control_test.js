"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
let expect = require('chai').expect;
const rpio = require('rpio');
const hp = require('../../helper');

const cr = require('../../../public/javascripts/gpio/contactRpio');
const uo = require('../../../public/javascripts/hour-control/updateOne');
const ua = require('../../../public/javascripts/hour-control/updateAll');
const up = require('../../../public/javascripts/hour-control/updatePin');
const sp = require('../../../public/javascripts/hour-control/spotcal');
let rpStub;

rpio.init({mock: 'raspi-3'});

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

describe("Test hour-controls", function() {
    describe("GET /hourcontrol", () => {
        it("1. 500 HAPPY PATH no mock", (done) => {
            let check = "Invalid pin: null";

            chai.request(server)
                .get("/hourcontrol")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log(res.body);
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.errors[0].message.should.equal(check);
                    done();
                });
        });

        it("XX. 200 show sensors", (done) => {
            chai.request(server)
                .get("/showsensors")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log(res.body);
                    res.should.have.status(200);
                    done();
                });
        });

        it("X. POST /editsensor", (done) => {
            let content = {
                column: "name",
                value: "sensor 1",
                id: 4
            };
            let check = "name updaterat med: sensor 1";

            chai.request(server)
                .post("/editsensor")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.message.should.eql(check);
                    done();
                });
        });
    });


    describe("contactRpio as stub", () => {
        beforeEach(function () {
            rpStub = sinon.stub(cr, 'contactRpioOut');
        });

        afterEach(function () {
            rpStub.restore();
        });

        it("1. 200 with stub but not async", (done) => {
            rpStub.returns(1);

            chai.request(server)
                .get("/hourcontrol")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log("1 - 200", res.body);
                    res.should.have.status(200);
                    res.headers['content-type'].should.contain('application/json');
                    done();
                });
        });

        it("2. 200 HAPPY PATH with stub, id and async", hp.mochaAsync(async () => {
            rpStub.returns(1);

            let res = await chai.request(server)
                .get("/hourcontrol/2");

            //console.log(res.body);
            res.status.should.eql(200);
        }));

        it("3. Test updatePin with stub fails", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();
            const params = { id: 1, gpio: 3 };

            rpStub.returns(null);

            await expect(up.updatePin(req, res, spy, params))
                .to.be.rejectedWith({Object});

            spy.called.should.be.false;
        }));
    });


    describe("hourcontrol fails", () => {
        it("1. 500 with wrong gpio id", (done) => {
            let check = "Cannot read property 'gpio' of undefined";

            chai.request(server)
                .get("/hourcontrol/3")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log("3. 500 gpio 3", res.body);
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.errors[0].message.should.equal(check);
                    done();
                });
        });

        it("5. Test updateOne no gpio", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();
            const params = { key: 'c0' };

            req.rooms = hp.testOneRoom();
            req.gpios = hp.gpiosDataList();
            await uo.updateOne(req, res, spy, params);
            spy.called.should.be.true;
        }));


        it("5. Test updateAll no gpio", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();
            const params = { key: 'c0' };

            req.rooms = hp.testTwoRooms();
            req.gpios = hp.gpiosDataList();
            await ua.updateAll(req, res, spy, params);
            spy.called.should.be.true;
        }));

        it("6. Test spotcal away", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            req.settings = hp.settings();
            req.content = hp.spot();
            await sp.tocontrol(req, res, spy);
            spy.called.should.be.false;
        }));
    });
});

