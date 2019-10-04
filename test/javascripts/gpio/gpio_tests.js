"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const rpio = require('rpio');
const hp = require('../../helper');
let rpStub;
let rpioStub;

const fg = require('../../../public/javascripts/gpio/fillGpioList');
const ip = require('../../../public/javascripts/gpio/initPins');
const ig = require('../../../public/javascripts/gpio/initGpios');
const updin = require('../../../public/javascripts/gpio/upd-gpio-in');
const updout = require('../../../public/javascripts/gpio/upd-gpio-out');
const cr = require('../../../public/javascripts/gpio/contactRpio');
const ug = require('../../../public/javascripts/gpio/update-gpio');
const eg = require('../../../public/javascripts/db/edit-gpio');

rpio.init({mock: 'raspi-3'});

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();


describe("Handle gpios", function() {
    describe("Test functions individually", () => {
        it("1. Test fillGpioList", hp.mochaAsync(async () => {
            let test = await fg.fillGpioList([]);

            test.should.eql([]);
            test.should.be.an('array').that.have.lengthOf(0);
        }));


        it("2. Test fillGpioList with stub", hp.mochaAsync(async () => {
            rpioStub = sinon.stub(rpio, 'read');

            rpioStub.returns(0);
            let test = await fg.fillGpioList([]);
            let list = hp.gpiolist();

            test.should.eql(list);
            test.should.be.an('array').that.have.lengthOf(26);
            rpioStub.restore();
        }));


        it("3. Test initPins with stub", hp.mochaAsync(async () => {
            let fgStub = sinon.stub(fg, 'fillGpioList');
            let list = hp.gpiolist();
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            fgStub.returns(list);
            await ip.initPins(req, res, spy);

            spy.called.should.be.false;
            fgStub.restore();
        }));

        it("4. Test initPins no stub", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            await ip.initPins(req, res, spy);

            spy.called.should.be.true;
        }));
    });

    describe("GET /savesensors", () => {
        it("1. 500 Init rpio mock default", (done) => {
            chai.request(server)
                .get("/initgpios")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.errors[0].should.be.an("object");
                    res.body.errors[0].source.should.eql('initPins');
                    done();
                });
        });

        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/showgpios")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.should.have.lengthOf(0);
                    done();
                });
        });
    });

    describe("Test more functions individually", () => {
        it("1. Test initGpios", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            await ig.insert(req, res, spy);

            spy.called.should.be.true;
        }));


        it("2. Test initGpios", hp.mochaAsync(async () => {
            const spy = sinon.spy();
            const res = hp.mockResponse();
            const req = hp.mockRequest();

            req.printPins = hp.gpiolist();
            await ig.insert(req, res, spy);

            spy.called.should.be.false;
        }));


        it("3. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/showgpios")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.should.have.lengthOf(26);
                    done();
                });
        });

        it("4. Test gpio-out without stub", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();

            let content = {
                gpio: 5,
                status: 1,
                mode: "out"
            };

            await updout.updOut(req, res, spy, content);

            spy.called.should.be.true;
        }));

        it("5. Test gpio-in without stub", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();

            let content = {
                gpio: 11,
                status: 1
            };

            await updin.updIn(req, res, spy, content);

            spy.called.should.be.true;
        }));

        it("6. Test update-gpio without stub", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            let content = {
                gpio: 13,
                status: 1,
                mode: "out"
            };

            req.body = content;

            await ug.update(req, res, spy);

            spy.called.should.be.true;
        }));

        it("7. Test update-gpio without stub for in", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            let content = {
                gpio: 13,
                status: 1,
                mode: "in"
            };

            req.body = content;

            await ug.update(req, res, spy);

            spy.called.should.be.true;
        }));


        it("8. TESTING !!!! editgpio, but cannot pass req.something", hp.mochaAsync(async () => {
            let content = {
                id: 3,
                gpio: 7,
                status: 1,
                mode: "out"
            };
            let headers = {
                'content-type': 'application/x-www-form-urlencoded',
                'updated': content
            };
            let ugStub = sinon.stub(ug, 'update');
            const req = hp.mockRequest();

            req.updated = content;
            await chai.request(server)
                .post("/editgpio")
                .set(headers)
                .send(content)
                .then(function (res) {
                    //console.log(res.body);
                    res.status.should.eql(404);
                })
                .catch(function (err) {
                    throw err;
                });
            ugStub.restore();
        }));


        it("9. Editgpio hascred missing params", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            const params = {gpio: null, id: "in"};

            await eg.hascred(req, res, spy, params);
            spy.called.should.be.false;
        }));

        it("10. Editgpio update wrong data", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            let content = {
                id: 3,
                gpio: 1,
                status: "string",
                mode: "out"
            };

            req.updated = content;
            await eg.update(req, res, spy);
            spy.called.should.be.true;
        }));
    });

    describe("Test updates with stubs", () => {
        it("1. Test gpio-out with stub", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            let content = {
                gpio: 5,
                status: 1,
                mode: "out"
            };

            rpStub = sinon.stub(cr, 'contactRpioOut');
            rpStub.returns(1);
            await updout.updOut(req, res, spy, content);

            spy.called.should.be.false;
            rpStub.restore();
        }));


        it("2. Test gpio-in with stub", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            let content = {
                gpio: 11,
                status: 1
            };

            rpStub = sinon.stub(cr, 'contactRpioIn');
            rpStub.returns(1);
            await updin.updIn(req, res, spy, content);

            spy.called.should.be.false;
            rpStub.restore();
        }));

        it("2. Test update-gpio with stub", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            let content = {
                gpio: 13,
                status: 1,
                mode: "out"
            };

            rpStub = sinon.stub(cr, 'contactRpioOut');
            req.body = content;
            rpStub.returns(1);

            await ug.update(req, res, spy);

            spy.called.should.be.false;
            rpStub.restore();
        }));
    });
});
