const express = require("express");
const { 
  getAllUsers, 
  getUserInfo, 
  postAUser,
  updateUserName,
  deleteUser 
} = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserInfo);
usersRouter.post('/', postAUser);
usersRouter.put('/:id', updateUserName);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;
