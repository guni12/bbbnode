"use strict";

/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Visit and get spotcal", function() {
    describe("GET /gpios", () => {
        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/gpios")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.should.have.lengthOf(26);
                    done();
                });
        });
    });
});
