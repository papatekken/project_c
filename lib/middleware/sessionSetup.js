'use strict';

var session = require('express-session');
var dotenv = require('dotenv');

dotenv.config();

var init = function () {
    return session({
        secret: process.env.SESSION_SECRET,
        cookie: {},
        resave: false,
        saveUninitialized: true
    });
}

module.exports = init();