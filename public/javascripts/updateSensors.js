const reg = require('./status');
const db = require('../../db/database');

module.exports = (function () {
    function updateSensors(req, res, next) {
        let obj = req.sensors;
        let len = Object.keys(obj).length;
        let measured = obj[len-1].date + " " + obj[len-1].time;
        let sql = "UPDATE zones SET tempis = ?, measured = ? WHERE sensorid = ?";
        let message = {
            "message": ""
        };

        for (let i = 0; i < len-1; i++) {
            let params = [obj[i].t, measured, obj[i].id];

            db.run(sql,
                params, (err) => {
                    if (err) {
                        let obj = reg.reterror(500, "/tempupdate", err.message);

                        return res.status(500).json(obj);
                    } else {
                        let part = "Uppdaterat " + obj[i].id + " med temp ";

                        message.message += part + obj[i].t + " och tid " + measured + "\n";
                    }
                }
            );
        }
        req.message = message;
        next();
    }


    return {
        updateSensors: updateSensors
    };
}());
