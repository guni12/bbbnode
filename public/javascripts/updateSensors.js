const rsql = require('./runSql');
const wv = require('./whenVar');

module.exports = (function () {
    function updateSensors(req, res, next) {
        let len = req.content.length;
        let when = wv.whenVar(req.content[len-1]);
        let sql = "UPDATE zones SET tempis = ?, measured = ? WHERE sensorid = ?";
        let message = {
            "message": ""
        };

        for (let i = 0; i < len-1; i++) {
            let params = { par: [req.content[i].t, when, req.content[i].id], where: "/tempupdate" };

            message += rsql.runSql(req, res, sql, params);
        }
        req.message = message;
        next();
    }


    return {
        updateSensors: updateSensors
    };
}());
