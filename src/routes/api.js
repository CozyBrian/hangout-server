const express = require('express');

const usersRouter = require("./users/users.route");
const messagesRouter = require("./messages/messages.route");
const authRouter = require("./auth/auth.route");

const api = express.Router();

api.use('/users', usersRouter);
api.use('/messages', messagesRouter);
api.use('/auth', authRouter);

module.exports = api;