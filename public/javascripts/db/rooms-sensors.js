const asyn = require('./sqliteAsync');

async function leftJoin(req, res, next) {
    let sql = "SELECT sens.*, rms.id AS roomid, rms.should, rms.max, rms.min, ";

    sql += "rms.away, rms.dsm, rms.ison, rms.isoff, rms.roomname, rms.mainroom ";
    sql += "FROM sensors sens JOIN rooms rms ";
    sql += "ON rms.sensorid = sens.sensor";


    if (req.params.id) {
        sql += " WHERE rms.id = " + req.params.id + ";";
    }

    await asyn.Async(sql, 'all')
        .then((data) => {
            req.rooms = data;
        })
        .catch(er => {
            next(er);
        });
}

module.exports = {
    leftJoin: leftJoin
};
