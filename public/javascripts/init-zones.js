const reg = require('./status.js');
const db = require('../../db/database.js');
const fs = require('fs');

module.exports = (function () {
    let list = [];

    function init(req, res, next) {
        let myfile = __dirname + '/../scripts/sensordetails.txt';

        fs.readFile(myfile, function(err, data) {
            if (err) {
                //console.log("err", err);
                return res.json(err);
            } else {
                list = JSON.parse(data);
                //console.log("Rad 17", list);
                next();
            }
        });
    }

    function check(req, res, next) {
        let sql = "SELECT * FROM zones";

        //console.log("Rad 28", list);

        db.get(sql,
            (err, row) => {
                if (row) {
                    //console.log("row", row);
                    let message = {"message": "Redan initierat"};

                    res.json(message);
                } else {
                    console.log(err);
                    next();
                }
            }
        );
    }

    function insert(req, res) {
        let nr = 1;

        //console.log("list, 47", list);
        //console.log("liststring, 48", liststring);

        let time = list[list.length - 1].time;
        let date = list[list.length - 1].date;
        let when = date + " " + time;
        let message = {"message": "Klart"};
        let cols = "(sensorid, zone, gpio, away, dsm, tempis, isoff, ison,";

        cols += " max, min, should, name, measured)";

        let sql = "INSERT INTO zones " + cols + " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

        for (let i = 0; i < list.length - 1; i++) {
            let zone = "zone" + nr;
            let params = [
                list[i].id,
                zone,
                0,
                0,
                0,
                list[i].t,
                null,
                null,
                0,
                0,
                0,
                'Namn',
                when
            ];

            db.run(sql,
                params, (err) => {
                    if (err) {
                        let obj = reg.reterror(500, "/addzone", err.message);

                        return res.status(500).json(obj);
                    } else {
                        message.message = zone + ", " + list[i].id + " och " + list[i].t + "\n";
                    }
                }
            );
            nr += 1;
        }
        //console.log(message);
        res.json(message);
    }

    return {
        init: init,
        check: check,
        insert: insert
    };
}());

