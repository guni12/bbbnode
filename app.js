const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const getReadDataRouter = require("./routes/read-data");
const settingsRouter = require("./routes/get-settings");
const settingsEditRouter = require("./routes/edit-settings");
const spotcalRouter = require("./routes/spotcal");
const allRoomsRouter = require("./routes/all-rooms");
const addRoomRouter = require("./routes/add-room");
const editRoomRouter = require("./routes/edit-room");
const deleteRoomRouter = require("./routes/delete-room.js");
const roomsSensors = require("./routes/rooms-sensors");
const sensorEditRouter = require("./routes/edit-sensor");
const saveSensors = require("./routes/save-sensors");
const showSensors = require("./routes/show-sensors");
const deleteSensorRouter = require("./routes/delete-sensor.js");
const initGpios = require("./routes/init-gpios");
const showGpios = require("./routes/show-gpios");
const editGpio = require("./routes/edit-gpio");
const hourControlRouter = require("./routes/hour-control");
const updateControls = require("./routes/control-update");
const updateTempRouter = require("./routes/update-temperatures");
const isAuthRouter = require("./routes/isauth");
const logoutRouter = require("./routes/logout");

const app = express();

app.use(cors());
app.use(logger("dev"));

// don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
    // use morgan to log at command line
    app.use(logger("combined")); // 'combined' outputs the Apache style LOGs
}

app.disable('etag');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use('/today', getReadDataRouter);
app.use('/today2', getReadDataRouter);
app.use('/controls', getReadDataRouter);
app.use("/settings", settingsRouter);
app.use("/editsettings", settingsEditRouter);
app.use("/spotcal", spotcalRouter);
app.use("/rooms", allRoomsRouter);
app.use("/addroom", addRoomRouter);
app.use("/editroom", editRoomRouter);
app.use("/deleteroom", deleteRoomRouter);
app.use("/roomssensors", roomsSensors);
app.use('/editsensor', sensorEditRouter);
app.use('/savesensors', saveSensors);
app.use('/showsensors', showSensors);
app.use("/deletesensor", deleteSensorRouter);
app.use('/initgpios', initGpios);
app.use('/showgpios', showGpios);
app.use('/editgpio', editGpio);
app.use('/hourcontrol', hourControlRouter);
app.use('/controlupdate', updateControls);
app.use('/tempupdate', updateTempRouter);
app.use('/isauth', isAuthRouter);
app.use('/logout', logoutRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use((err, req, res, next) => {
    //console.log("Err i app", err, typeof(err), err.type);

    err = err.obj ? err.obj : err;
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "type": err.type,
                "error": err.name,
                "status": err.status,
                "source": err.source,
                "message": err.message,
                "extra": err.extra
            }
        ]
    });
});


const debug = require("debug")("express:*");
const http = require("http");

const port = process.env.NODE_ENV === "test" ? "1339" : normalizePort(process.env.PORT || "1337");

app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string"
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}



/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();

    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;

    debug("Listening on " + bind);
}


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

console.log(`Example app listening on port ${port}`);


module.exports = server;
