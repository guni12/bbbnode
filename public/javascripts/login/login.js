const reg = require('../status.js');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function login(req, res) {
    let user = res.locals.user;

    bcrypt.compare(req.body.value, user.password, (err, result) => {
        if (err) {
            let obj = reg.reterror(500, "/login", "bcrypt fel");

            return res.status(500).json(obj);
        }

        if (result) {
            const payload = { email: user.email, id: user.id };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: "1h"});
            const text = "Medlem " + payload.id + " loggade in";
            let obj = reg.retsuccess(payload.id, token, text);

            res.cookie('token', token, { maxAge: 30 * 60 * 1000, httpOnly: true });

            return res.status(200).json(obj);
        }
        let obj = reg.reterror(401, "/login", "Fel lösenord.");

        return res.status(401).json(obj);
    });
}

module.exports = {
    login: login
};
