"use strict";

/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const fs = require('fs');
let writeFileStub;
//const updateTemp = require('../../../public/javascripts/update-temperatures');
const pf = require('../../../public/javascripts/printFile');
const update = require('../../../public/javascripts/updateSensors');

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

describe("Visit sensors and update temperatures", function() {
    describe("GET /tempupdate", () => {
        const mockRequest = (list, m=null) => ({
            content: list,
            message: m
        });

        let temps = [
            {"id": "28-021466fea4ff", "t": 21.25},
            {"id": "28-0214671137ff", "t": 21.5},
            {"id": "28-0214671226ff", "t": 21.44},
            {"id": "28-0214672d0cff", "t": 21.19},
            {"id": "28-02146745baff", "t": 21.44},
            {"id": "28-031466aef3ff", "t": 21.44},
            {"id": "28-031466ba20ff", "t": 21.56},
            {"id": "28-031466c1e7ff", "t": 21.38},
            {"time": "09:30:01", "date": "2019-08-10"}];


        const mockResponse = () => {
            const res = {};

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
            return res;
        };


        it("1. 500 ds18b20-raspi can't reach sensors", (done) => {
            let check = "Error: Could not list 1-Wire sensors";

            chai.request(server)
                .get("/tempupdate")
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


        it("2. Test updateSensors", () => {
            const req = mockRequest(
                temps
            );

            const res = mockResponse();
            const spy = sinon.spy();

            update.updateSensors(req, res, spy);
            spy.called.should.be.true;
        });


        it("3. Test printFile with error", () => {
            const req = mockRequest(
                temps
            );
            const res = mockResponse();
            const spy = sinon.spy();
            const params = { where: './public/scripts/gpiodetails.txt', what: 'printPins' };

            writeFileStub = sinon.stub(fs, 'writeFile')
                .returns("I am a fake call!");

            writeFileStub.yields( new Error("Testfel här"));

            pf.printFile(req, res, spy, params);
            writeFileStub.should.have.been.called;
            fs.writeFile.restore();
            writeFileStub.restore();
        });
    });
});
