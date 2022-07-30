'use strict'

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = (() => {
    const express = require('express');
    const app = express();
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use('/', indexRouter);
    return app;
})()

module.exports = app;
