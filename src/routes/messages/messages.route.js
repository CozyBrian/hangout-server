const express = require("express");
const { postMessage, getMessages, getMessagesList, getLastMessages } = require("./messages.controller");

const messagesRouter = express.Router();

messagesRouter.post('/', postMessage);
messagesRouter.post('/:id', getMessages);
messagesRouter.get('/:id', getMessagesList);
messagesRouter.get('/last/latest', getLastMessages);



module.exports = messagesRouter;