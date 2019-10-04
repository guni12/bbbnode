process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiPromise = require("chai-as-promised");
let expect = require('chai').expect;
const bcrypt = require('bcryptjs');
const sinon = require("sinon");
const server = require("../../../app.js");
const hp = require("../../helper.js");
const reg = require("../../../public/javascripts/login/register");

chai.should();

chai.use(chaiHttp);
chai.use(chaiPromise);


describe("Register and login user", function() {
    describe("POST /register", () => {
        it("1. should get 401 as we do not provide valid password", (done) => {
            let user = {
                column: "testing@example.com",
                value: "",
            };
            let check = "Email eller lösenord saknas";

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors[0].status.should.be.equal(401);
                    res.body.errors[0].message.should.eql(check);

                    done();
                });
        });


        it("2a. should get 201", (done) => {
            let user = {
                column: "test@example.com",
                value: "123test",
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    //console.log("2a", res.body, res.headers);
                    res.should.have.status(201);
                    //console.log("2a TEST:", res.body);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.be.a("string");

                    done();
                });
        });


        it("2b. should get 500 unique email constraint", (done) => {
            let user = {
                column: "test@example.com",
                value: "123test",
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    var tx = "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email";

                    res.body.errors.message.should.be.equal(tx);
                    done();
                });
        });


        it("3. should get 201 with random email", (done) => {
            let pre = hp.makeid();
            let unique = pre + "@example.com";
            let user = {
                column: unique,
                value: "1235test",
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.be.a("string");

                    done();
                });
        });
    });

    describe("bcrypt failure tests", () => {
        it("1. should throw for bcrypt hash problem", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const salt = "c12b6s";
            let spy = sinon.spy();

            //return or await means waiting for promise
            req.body = {value: "1237test"};
            await expect(reg.makehash(req, res, spy, salt))
                .to.eventually.be.fulfilled
                .then(() => {
                    //expect(bcrypt.hash("1237test", salt)).to.eventually.be.rejectedWith('caw');
                    return expect(bcrypt.hash("1237test", salt))
                        .to.be.rejected;
                })
                .catch((check) => {
                    console.log("CHECK", check);
                });
        }));


        it("2. should throw for bcrypt salt problem", hp.mochaAsync(async () => {
            const req = hp.mockRequest();
            const res = hp.mockResponse();
            const spy = sinon.spy();
            let fooSpy = sinon.spy(reg, 'hashbcrypt');

            await fooSpy(req, res, spy);

            spy.called.should.be.true;
            fooSpy.restore();
        }));
    });



    describe("POST /login", () => {
        it('4. should get 401 as we do not provide valid password', (done) => {
            let user = {
                column: "test@example.com",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.message.should.be.equal("Email eller lösenord saknas");

                    done();
                });
        });


        it("5. should get 401 as we do not provide valid email", (done) => {
            let user = {
                value: "123test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.message.should.be.equal("Email eller lösenord saknas");

                    done();
                });
        });


        it("6. should get 401 as we provide wrong email", (done) => {
            let user = {
                column: "testing@example.com",
                value: "123test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.message.should.be.equal("Detta email finns inte.");

                    done();
                });
        });


        it("7. should get 401 as we provide wrong password", (done) => {
            let user = {
                column: "test@example.com",
                value: "1234test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.message.should.be.equal("Fel lösenord.");

                    done();
                });
        });


        it("8. should get 200 as we do provide correct keys", (done) => {
            process.env.JWT_SECRET = "secret";
            let user = {
                column: "test@example.com",
                value: "123test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.be.equal("Medlem 1 loggade in");
                    done();
                });
        });
        delete process.env.JWT_SECRET;
    });
});
