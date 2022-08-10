const express = require("express");
const { postMessage, getMessages } = require("./messages.controller");

const messagesRouter = express.Router();

messagesRouter.post('/', postMessage);
messagesRouter.get('/', getMessages);


module.exports = messagesRouter;