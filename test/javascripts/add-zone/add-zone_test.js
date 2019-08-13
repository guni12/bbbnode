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

describe("Add a zone to the zones", function() {
    describe("POST /addzone", () => {
        it("1. HAPPY PATH 201 for successful insert.", (done) => {
            let when = "2019-08-10 09:30:01";
            let params = [
                "28-021466fea4ff",
                "zone1",
                null,
                0,
                0,
                21.25,
                null,
                null,
                0,
                0,
                0,
                'Namn',
                when
            ];

            let params2 = JSON.stringify(params);

            let content = {
                data: params2,
            };

            let check = "Inlagt 28-021466fea4ff,zone1,,0,0,21.25,,,0,0,0,Namn,2019-08-10 09:30:01";

            chai.request(server)
                .post("/addzone")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
                .end((err, res) => {
                    //console.log("res.body", res.body);
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.message.should.be.equal(check);

                    done();
                });
        });

        it("2. 500 for missing sensorid.", (done) => {
            let when = "2019-08-10 09:30:01";
            let params = [
                null,
                "zone1",
                null,
                0,
                0,
                21.25,
                null,
                null,
                0,
                0,
                0,
                'Namn',
                when
            ];

            let params2 = JSON.stringify(params);

            let content = {
                data: params2,
            };

            let check = "SQLITE_CONSTRAINT: NOT NULL constraint failed: zones.sensorid";

            chai.request(server)
                .post("/addzone")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(content)
                .end((err, res) => {
                    //console.log("res.body", res.body);
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.detail.should.be.equal(check);

                    done();
                });
        });

        it("3. 401 for missing data.", (done) => {
            let check = "Data saknas";

            chai.request(server)
                .post("/addzone")
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    //console.log("res.body", res.body);
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.detail.should.be.equal(check);

                    done();
                });
        });
    });
});
