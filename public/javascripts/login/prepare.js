const th = require('../throw');
const reg = require('./register');

async function register(req, res, next) {
    try {
        //console.log("I prepare", req.body);
        if (!req.body.column || !req.body.value) {
            let text = "Email eller lösenord saknas";
            let obj = th.throwerror("Error", 401, "prepare", text);

            throw { obj, error: new Error() };
        } else {
            await reg.hashbcrypt(req, res, next);
        }
    } catch (err) {
        next(err);
        //console.log("PREPARE i login err: ", err);
    }
}

module.exports = {
    register: register
};
