/* global describe it */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app.js");

chai.should();

//var path = require("path");
//const db = require(path.resolve(__dirname, "../../../db/database.js"));

chai.use(chaiHttp);

function makeid() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


describe("Register and login user", function() {
    describe("POST /register", () => {
        it("1. should get 401 as we do not provide valid password", (done) => {
            let user = {
                email: "testing@example.com",
                password: "",
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);

                    done();
                });
        });


        it("2a. should get 201", (done) => {
            let user = {
                email: "test@example.com",
                password: "123test",
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    //console.log("2a", res.body, res.headers);
                    res.should.have.status(201);
                    //console.log(res.body);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.be.a("string");

                    done();
                });
        });


        it("2b. should get 500 unique email constraint", (done) => {
            let user = {
                email: "test@example.com",
                password: "123test",
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    //console.log(res.body);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    var tx = "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email";

                    res.body.errors.detail.should.be.equal(tx);
                    done();
                });
        });


        it("3. should get 201 with random email", (done) => {
            let pre = makeid();
            let unique = pre + "@example.com";
            let user = {
                email: unique,
                password: "1235test",
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    //console.log(res.body);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.be.a("string");

                    done();
                });
        });
    });



    describe("POST /login", () => {
        it('4. should get 401 as we do not provide valid password', (done) => {
            let user = {
                email: "test@example.com",
                //password: "123test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.title.should.be.equal("Email or password missing");

                    done();
                });
        });


        it("5. should get 401 as we do not provide valid email", (done) => {
            let user = {
                //email: "test@example.com",
                password: "123test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.title.should.be.equal("Email or password missing");

                    done();
                });
        });


        it("6. should get 401 as we provide wrong email", (done) => {
            let user = {
                email: "testing@example.com",
                password: "123test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.title.should.be.equal("User with provided email not found.");

                    done();
                });
        });


        it("7. should get 401 as we provide wrong password", (done) => {
            let user = {
                email: "test@example.com",
                password: "1234test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.title.should.be.equal("Password is incorrect.");

                    done();
                });
        });


        it("8. should get 201 as we do provide correct keys", (done) => {
            process.env.JWT_SECRET = "secret";
            //console.log("jwt", process.env.JWT_SECRET);
            let user = {
                email: "test@example.com",
                password: "123test",
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    //console.log(res.body);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.be.equal("User logged in");
                    done();
                });
        });
        delete process.env.JWT_SECRET;
    });
});
