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
const settingsRouter = require("./routes/get-settings");
const settingsEditRouter = require("./routes/edit-settings");
const spotcalRouter = require("./routes/spotcal");
const allZonesRouter = require("./routes/all-zones");
const zoneEditRouter = require("./routes/edit-zone");
const addZoneRouter = require("./routes/add-zone");
const initZonesRouter = require("./routes/init-zones");
const findSensorsRouter = require("./routes/find-sensors");
const updateTempRouter = require("./routes/update-temperatures");
const changeGpioRouter = require("./routes/update-gpio");
const getGpiosRouter = require("./routes/get-gpios");
const getTodayDataRouter = require("./routes/get-today");
const getControlDataRouter = require("./routes/get-controls");
const hourControlRouter = require("./routes/hour-control");
const updateControls = require("./routes/control-update");

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
app.use("/settings", settingsRouter);
app.use("/editsettings", settingsEditRouter);
app.use("/spotcal", spotcalRouter);
app.use("/zones", allZonesRouter);
app.use('/editzone', zoneEditRouter);
app.use('/addzone', addZoneRouter);
app.use('/init', initZonesRouter);
app.use('/find', findSensorsRouter);
app.use('/tempupdate', updateTempRouter);
app.use('/rpio', changeGpioRouter);
app.use('/gpios', getGpiosRouter);
app.use('/hourcontrol', hourControlRouter);
app.use('/today', getTodayDataRouter);
app.use('/control', getControlDataRouter);
app.use('/controlupdate', updateControls);

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
