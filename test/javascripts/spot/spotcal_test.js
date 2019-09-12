"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.use(chaiHttp);
chai.should();

describe("Visit and get spotcal", function() {
    describe("GET /spotcal", () => {
        const RealDate = Date;
        const constantDate = new Date('2018-01-01T17:00:00');

        beforeEach(() => {
            global.Date = class extends Date {
                constructor() {
                    super();
                    return constantDate;
                }
            };
        });

        afterEach(() => {
            global.Date = RealDate;
        });


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

        it("3. should get 200 for handled id.", (done) => {
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
