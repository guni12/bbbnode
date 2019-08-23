"use strict";

/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Visit and get spotcal", function() {
    describe("GET /spotcal", () => {
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

        it("3. should get 200 for successful fetch.", (done) => {
            chai.request(server)
                .get("/spotcal/control")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    done();
                });
        });

        it("4. should get 200 for successful fetch.", (done) => {
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
