const reg = require('./status.js');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (function () {
    function login(req, res) {
        let user = res.locals.user;

        //bcrypt.compare(req.body.password, user.password, (err, result) => {
        bcrypt.compare(req.body.value, user.password, (err, result) => {
            if (err) {
                let obj = reg.reterror(500, "/login", "bcrypt error");

                return res.status(500).json(obj);
            }

            if (result) {
                const payload = { email: user.email, id: user.id };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, { expiresIn: "1h"});
                let obj = reg.retsuccess(payload, token, "User logged in");

                return res.json(obj);
            } else {
                let obj = reg.reterror(401, "/login", "Password is incorrect.");

                return res.status(401).json(obj);
            }
        });
    }

    return {
        login: login
    };
}());
