const reg = require('../status');
const insert = require('./insert');
const bcrypt = require('bcryptjs');

function hashbcrypt(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.value, salt, function(err, hash) {
            if (err) {
                let obj = reg.reterror(500, "register", "bcrypt error");

                return res.status(500).json(obj);
            }

            insert.insert(req, res, [req.body.column, hash]);
            return undefined;
        });
    });
}

module.exports = {
    hashbcrypt: hashbcrypt
};
