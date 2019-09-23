const db = require('../../../db/database.js');
const reg = require('../status.js');
const bcrypt = require('bcryptjs');

function hashbcrypt(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.value, salt, function(err, hash) {
            if (err) {
                let obj = reg.reterror(500, "/register", "bcrypt error");

                return res.status(500).json(obj);
            }

            db.run("INSERT INTO users (email, password) VALUES (?, ?)",
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
    });
}

module.exports = {
    hashbcrypt: hashbcrypt
};
