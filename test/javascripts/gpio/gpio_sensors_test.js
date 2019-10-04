"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const rpio = require('rpio');
const sensor = require('ds18b20-raspi');
const hp = require('../../helper');

const swt = require('../../../public/javascripts/sensors/sensorsWithTime.js');
const ss = require('../../../public/javascripts/sensors/saveSensors.js');
const us = require('../../../public/javascripts/sensors/updateSensors');
const fns = require('../../../public/javascripts/sensors/find-newsensors');

rpio.init({mock: 'raspi-3'});

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();


describe("Find and store all sensors", function() {
    describe("GET /savesensors", () => {
        it("1. 500 rpio can't reach pins", (done) => {
            let check = "ds18b20-raspi kan inte nå sensorerna";

            chai.request(server)
                .get("/savesensors")
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



    describe("Test functions individually", () => {
        it("1. Test saveSensors", (done) => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            req.content = hp.swtsmall();
            ss.insert(req, res, spy);
            done();
        });

        it("2. Test sensorsWitTime with stub", hp.mochaAsync(async () => {
            let dsStub = sinon.stub(sensor, 'readAllC');
            let list = hp.swtsmall();
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            dsStub.returns(list);
            await swt.sensorsWithTime(req, res, spy);

            spy.called.should.be.false;
            dsStub.restore();
        }));


        it("3. Test updateSensors with stub", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            req.content = hp.swtsmall();
            await us.updateSensors(req, res, spy);
            spy.called.should.be.false;
        }));

        it("4. Test find new sensors", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            req.content = hp.swtlist();
            req.sensors = hp.sensorlist();
            await fns.findnew(req, res, spy);
            spy.called.should.be.false;
        }));

        it("5. Test find new sensors with wrong input", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            req.content = {};
            req.sensors = hp.sensorlist();
            await fns.findnew(req, res, spy);
            spy.called.should.be.true;
        }));

        it("5. Test save remaining sensors", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            req.content = hp.swtlist();
            req.newsensors = hp.newsensors();
            await ss.insert(req, res, spy, 'newsensors');
            spy.called.should.be.false;
        }));
    });


    describe("Handle sensors when inserted", () => {
        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/showsensors")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("array");
                    res.body.should.have.lengthOf(8);
                    done();
                });
        });

        it("2. 200 HAPPY PATH", (done) => {
            let check = "Kastat id 2 från sensors";

            chai.request(server)
                .get("/deletesensor/2")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    res.should.have.status(200);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.message.should.eql(check);
                    done();
                });
        });

        it("3. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/roomssensors")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("array");
                    res.body.should.have.lengthOf(1);
                    done();
                });
        });
    });
});
