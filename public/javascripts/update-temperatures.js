const fs = require('fs');
const sensor = require('ds18b20-raspi');
const reg = require('./status.js');
const db = require('../../db/database.js');

module.exports = (function () {
    function update(req, res, next) {
        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        let timeoptions = {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        let d = new Date();
        let time = d.toLocaleTimeString('sv-SE', timeoptions);
        let date = d.toLocaleDateString('sv-SE', options);

        sensor.readAllC(2, (err, temps) => {
            if (err) {
                let item = {time: time, date: date};
                let obj = reg.reterror(500, './tempupdate', err, item);

                return res.status(500).json(obj);
            } else {
                let item = {time: time, date: date};

                temps.push(item);
                req.sensors = temps;
                next();
            }
        });
    }



    function printFile(req, res, next) {
        let obj = req.sensors;
        let f = '/home/pi/bbbnode/public/scripts/sensordetails.txt';

        fs.writeFile(f, JSON.stringify(obj), function (err) {
            if (err) {
                let obj = reg.reterror(500, './tempupdate', err);

                return res.status(500).json(obj);
            }
        });
        req.details = obj;
        next();
    }

    function updateSqlite(req, res) {
        let obj = req.details;
        let len = Object.keys(obj).length;
        let measured = obj[len-1].date + " " + obj[len-1].time;
        let sql = "UPDATE zones SET tempis = ?, measured = ? WHERE sensorid = ?";
        let message = {
            "message": ""
        };

        for (let i = 0; i < len-1; i++) {
            let params = [obj[i].t, measured, obj[i].id];

            //console.log("update:", obj[i]);
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
        //console.log("update:", "Klart");
        return res.json(message);
    }


    return {
        update: update,
        printFile: printFile,
        updateSqlite: updateSqlite
    };
}());
