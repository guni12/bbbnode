"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Visit and get rooms-info", function() {
    describe("GET /rooms/:id", () => {
        it("-2. should get 201 for success", (done) => {
            let check = 'Inlagt 0,0,0,0,0,"Klicka för att hantera",0';

            chai.request(server)
                .get("/addroom")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.message.should.eql(check);
                    done();
                });
        });

        it("-1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/addroom")
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("1. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/rooms")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });

        it("2. 200 HAPPY PATH with id", (done) => {
            chai.request(server)
                .get("/rooms/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("3. 400 Wrong id", (done) => {
            chai.request(server)
                .get("/rooms/5")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.errors[0].message.should.eql("Detta id finns inte");
                    done();
                });
        });

        it("4. 200 HAPPY PATH deleted", (done) => {
            let check = "Kastat id 1 från rooms";

            chai.request(server)
                .get("/deleteroom/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.message.should.eql(check);
                    done();
                });
        });

        it("5. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/rooms")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.should.have.lengthOf(1);
                    done();
                });
        });

        it("X. 200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/addroom")
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("6. POST /editrooms", (done) => {
            let content = {
                column: "sensorid",
                value: "28-0214672d0cff",
                id: 2
            };
            let check = "sensorid updaterat med: 28-0214672d0cff";

            chai.request(server)
                .post("/editroom")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
                .end((err, res) => {
                    //console.log("res.body", res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.message.should.eql(check);
                    done();
                });
        });
    });
});
