const db = require('../../db/database.js');
const reg = require('./status.js');
const saltRounds = 10;

module.exports = (function () {
    function hashbcrypt(req, res) {
        const bcrypt = require('bcrypt');

        //bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        bcrypt.hash(req.body.value, saltRounds, function(err, hash) {
            if (err) {
                let obj = reg.reterror(500, "/register", "bcrypt error");

                return res.status(500).json(obj);
            }

            db.run("INSERT INTO users (email, password) VALUES (?, ?)",
                //req.body.email, hash, (err) => {
                req.body.column, hash, (err) => {
                    if (err) {
                        let obj = reg.reterror(500, "/register", err.message);

                        return res.status(500).json(obj);
                    }

                    res.status(201).json({
                        data: {
                            message: "User " + req.body.column + " registered with: ." + hash
                        }
                    });
                });
        });
    }


    return {
        hashbcrypt: hashbcrypt,
    };
}());
