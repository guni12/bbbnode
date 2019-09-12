"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Visit and get zones", function() {
    describe("GET /zones", () => {
        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/zones")
                .end((err, res) => {
                    //console.log("1. res.body", res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.should.have.lengthOf(0);
                    done();
                });
        });

        it("2. 400 Bad Request", (done) => {
            let message = "Detta id finns inte";

            chai.request(server)
                .get("/zones/11")
                .end((err, res) => {
                    //console.log("2. res.body", res.body);
                    res.should.have.status(400);
                    res.body.errors[0].message.should.be.equal(message);
                    done();
                });
        });

        it("3. 200 HAPPY PATH", (done) => {
            let check = "Klart";

            chai.request(server)
                .get("/init")
                .end((err, res) => {
                    //console.log("res.body", res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.be.equal(check);
                    done();
                });
        });


        it("4. 200 HAPPY PATH", (done) => {
            let check = "Redan initierat";

            chai.request(server)
                .get("/init")
                .end((err, res) => {
                    //console.log("res.body", res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.be.equal(check);
                    done();
                });
        });

        it("5. 200 HAPPY PATH", (done) => {
            let check = 1;

            chai.request(server)
                .get("/zones")
                .end((err, res) => {
                    //console.log("5. res.body", res.body);
                    //console.log("One", res.body[0]);

                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body[0].id.should.be.equal(check);
                    res.body[0].id.should.be.a('number');
                    res.body[0].sensorid.should.be.a('string');
                    done();
                });
        });

        it("6. 200 HAPPY PATH", (done) => {
            let check = 3;

            chai.request(server)
                .get("/zones/3")
                .end((err, res) => {
                    //console.log("6. res.body", res.body, typeof(res.body), res.body.gpio);
                    res.should.have.status(200);
                    let obj = res.body;

                    obj.id.should.be.equal(check);
                    done();
                });
        });
    });
});
