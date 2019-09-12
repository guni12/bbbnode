"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Get todays control-values for each hour from file", function() {
    describe("GET /control", () => {
        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/control")
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.should.have.property(0);
                    done();
                });
        });
    });
});
