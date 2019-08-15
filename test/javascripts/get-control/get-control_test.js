"use strict";

/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Visit and get controls", function() {
    describe("GET /control", () => {
        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/control")
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("Area");
                    done();
                });
        });
    });
});
