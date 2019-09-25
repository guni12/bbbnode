const db = require('../../../db/database.js');
const reg = require('../status.js');

function insert(req, res, params) {
    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        params, (err) => {
            if (err) {
                let obj = reg.reterror(500, "register", err.message);

                return res.status(500).json(obj);
            }

            return res.status(201).json({
                data: {
                    message: "User " + params[0] + " registered with: ." + params[1]
                }
            });
        });
}

module.exports = {
    insert: insert
};
