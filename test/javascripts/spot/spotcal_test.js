/** global: constantDate */
"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

function mockDateNow() {
    return new Date('2018-01-01T17:00:00');
}

describe("Visit and get spotcal", function() {
    describe("GET /spotcal", () => {
        const originalDateNow;

        beforeEach(() => {
            originalDateNow = Date.now();
            Date.now = mockDateNow();
        });

        after(() => {
            Date.now = originalDateNow;
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

        it("3. should get 200 for handled id.", (done) => {
            chai.request(server)
                .get("/spotcal/4")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
