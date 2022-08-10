const express = require('express');

const usersRouter = require("./users/users.route");
const messagesRouter = require("./messages/messages.route");
const authRouter = require("./auth/auth.route");
const authentication = require('../services/jwt');

const api = express.Router();

api.use('/users', authentication, usersRouter);
api.use('/messages', authentication, messagesRouter);
api.use('/auth', authRouter);

module.exports = api;