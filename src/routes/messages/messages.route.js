const express = require("express");
const { postMessage, getMessages, getMessagesList } = require("./messages.controller");

const messagesRouter = express.Router();

messagesRouter.post('/', postMessage);
messagesRouter.post('/:id', getMessages);
messagesRouter.get('/:id', getMessagesList);


module.exports = messagesRouter;