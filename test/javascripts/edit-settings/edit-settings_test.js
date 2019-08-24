/**
 * Test for class Card.
 */
"use strict";

/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.should();

chai.use(chaiHttp);

describe("Visit and update settings", function() {
    describe("POST /editsettings", () => {
        it("1. should get 200 for successful update.", (done) => {
            let content = {
                column: "currency",
                value: "EUR",
            };

            let check = 'currency updaterat med: EUR';

            chai.request(server)
                .post("/editsettings")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
                .end((err, res) => {
                    console.log("res.body", res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.message.should.be.equal(check);

                    done();
                });
        });


        it("2. should get 500 for wrong insert data.", (done) => {
            let content = {
                column: "areo",
                value: "SE4",
            };

            let check = 'SQLITE_ERROR: no such column: areo';

            chai.request(server)
                .post("/editsettings")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
                .end((err, res) => {
                    console.log("2. res.body", res.body);
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.equal(check);

                    done();
                });
        });

        it("3. should get 401 for insert data missing", (done) => {
            let content = {
                value: "SE4",
            };

            let check = 'Kolumn eller värde saknas';

            chai.request(server)
                .post("/editsettings")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.equal(check);

                    done();
                });
        });
    });
});
