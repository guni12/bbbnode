"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Get todays spotinfo", function() {
    describe("GET /today", () => {
        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/today")
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
