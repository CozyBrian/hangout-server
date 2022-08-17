const express = require("express");
const apicache = require("apicache");
const { 
  getAllUsers, 
  getUserInfo, 
  postAUser,
  updateUserName,
  deleteUser 
} = require("./users.controller");

const usersRouter = express.Router();

const cache = apicache.middleware;

usersRouter.get('/', cache("15 minutes"), getAllUsers);
usersRouter.get('/:id', getUserInfo);
usersRouter.post('/', postAUser);
usersRouter.put('/:id', updateUserName);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;
