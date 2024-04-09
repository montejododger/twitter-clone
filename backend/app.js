const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// IMPOIRT ROUTES FROM API
const usersRouter = require('./routes/api/users');
const tweetsRouter = require('./routes/api/tweets');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//ATTACH EXPRESS ROUTERS
app.use('/api/users', usersRouter);
app.use('/api/tweets', tweetsRouter);

module.exports = app;
