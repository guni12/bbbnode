const insert = require('./insert');
const bcrypt = require('bcryptjs');
const th = require('../throw');

async function hashbcrypt(req, res, next) {
    try {
        let salt = await makesalt();

        await makehash(req, res, next, salt);
        return undefined;
    } catch (err) {
        return next(err);
    }
}

async function makesalt() {
    return bcrypt.genSaltSync(10);
}

async function makehash(req, res, next, salt) {
    try {
        bcrypt.hash(req.body.value, salt, function(err, hash) {
            try {
                if (!err) {
                    insert.insert(req, res, [req.body.column, hash]);
                    return undefined;
                } else {
                    let text = "Bcrypt - hash problem";
                    let obj = th.throwerror("Error", 500, "register", text);

                    throw { obj, error: new Error() };
                }
            } catch (err) {
                //console.log("REG", err);
                return next(err);
            }
        });
    } catch (err) {
        return next(err);
    }
}


module.exports = {
    hashbcrypt: hashbcrypt,
    makehash: makehash
};
