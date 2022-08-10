const express = require('express');

const usersRouter = require("./users/users.route");
const messagesRouter = require("./messages/messages.route");

const api = express.Router();

api.use('/users', usersRouter);
api.use('/messages', messagesRouter);

module.exports = api;