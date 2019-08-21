"use strict";

/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const rpio = require('rpio');
const controls = require('../../../public/javascripts/controls');
const hourcontrol = require('../../../public/javascripts/hour-control');

rpio.init({mock: 'raspi-3'});

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

describe("Test controls", function() {
    describe("GET /hourcontrol", () => {
        const mockRequest = (f, lt) => ({
            file: f,
            printobj: lt,
        });

        const mockResponse = () => {
            const res = {};

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            return res;
        };

        it("1. 500 rpio can't reach pins", (done) => {
            let check = "Gpio pinne kunde ej läsas.";

            chai.request(server)
                .get("/hourcontrol")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    res.should.have.status(500);
                    res.headers['content-type'].should.contain('application/json');
                    res.body.should.be.an("object");
                    res.body.errors.title.should.equal(check);
                    done();
                });
        });


        it("2. 500 rpio can't reach pins - with id", (done) => {
            let check = "Gpio pinne kunde ej läsas.";

            chai.request(server)
                .get("/hourcontrol/3")
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

        it("3. 500 rpio can't reach pins - with wrong id", (done) => {
            let check = "Detta id finns inte";

            chai.request(server)
                .get("/hourcontrol/13")
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

        it("4. Test show with simple content", () => {
            const res = mockResponse();
            const req = mockRequest(
                "",
                []
            );

            hourcontrol.show(req, res);
            res.json.should.have.been.called;
        });

        it("5. Test first control", () => {
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

        it("6. Test second control", () => {
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

        it("7. Test third control", () => {
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

        it("8. Test fourth control", () => {
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
});
