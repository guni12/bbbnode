"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Visit and get all settings", function() {
    describe("GET /settings", () => {
        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/settings")
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("area");
                    res.body.should.have.property("currency");
                    res.body.currency.should.be.a("string");
                    done();
                });
        });
    });
});
