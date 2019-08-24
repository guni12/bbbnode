const rsql = require('./runSql');

module.exports = (function () {
    function updateSensors(req, res, next) {
        let len = req.sensors.length;
        let when = req.sensors[len-1].date + " " + req.sensors[len-1].time;
        let sql = "UPDATE zones SET tempis = ?, measured = ? WHERE sensorid = ?";
        let message = {
            "message": ""
        };

        for (let i = 0; i < len-1; i++) {
            let params = [req.sensors[i].t, when, req.sensors[i].id];

            message += rsql.runSql(req, res, sql, params);
        }
        req.message = message;
        next();
    }


    return {
        updateSensors: updateSensors
    };
}());
