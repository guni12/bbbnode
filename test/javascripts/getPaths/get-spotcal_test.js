"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");
let MockDate = require('mockdate');
let expect = require('chai').expect;
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const msi = require('../../../public/javascripts/spi/makeSpotInfo.js');
const si = require('../../../public/javascripts/spi/spotinfo');
const hp = require('../../helper');
let siStub;

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

describe("Visit and get spotcal", function() {
    describe("GET /spotcal", () => {
        beforeEach(() => {
            MockDate.set('2018-01-01T19:00:00');
        });

        afterEach(() => {
            MockDate.reset();
        });


        it("1. should get 200 for successful fetch.", (done) => {
            let check = '2019';

            chai.request(server)
                .get("/spotcal")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.Year.should.be.equal(check);
                    done();
                });
        });

        it("2. should get 200 for successful fetch.", (done) => {
            let check = '2019';

            chai.request(server)
                .get("/spotcal/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.Year.should.be.equal(check);
                    done();
                });
        });

        it("2b. 200 HAPPY PATH with async", hp.mochaAsync(async () => {
            let res = await chai.request(server)
                .get("/spotcal/2");

            console.log(res.body);
            res.status.should.eql(200);
        }));

        it("3. should get 200 for handled id.", (done) => {
            chai.request(server)
                .get("/spotcal/4")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });

        it("4. Test makeSpot mocked date", hp.mochaAsync(async () => {
            const req = hp.mockRequest();

            req.params = {id: '2'};
            siStub = sinon.stub(si, 'collectInfo').throws(new TypeError());

            await expect(msi.makeSpotInfo(req))
                .to.be.rejected;

            siStub.restore();
        }));
    });
});
