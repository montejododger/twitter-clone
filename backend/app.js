const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug");

const cors = require("cors");
const csurf = require("csurf");
const { isProduction } = require("./config/keys");

// IMPORT MODELS
require("./models/Users");

// IMPOIRT ROUTES FROM API
const usersRouter = require("./routes/api/users");
const tweetsRouter = require("./routes/api/tweets");
const csrfRouter = require("./routes/api/csrf");

const app = express();

//  USE MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS MIDDLEWARE
if (!isProduction) app.use(cors());

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

//ATTACH EXPRESS ROUTERS
app.use("/api/users", usersRouter);
app.use("/api/tweets", tweetsRouter);
app.use("/api/csrf", csrfRouter);

//  HANDLING 404 NOT FOUND MIDDLEWARE
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
});

//  ERROR HANDLING MIDDLEWARE
const serverErrorLogger = debug("backend:error");
app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors,
    });
});

module.exports = app;
