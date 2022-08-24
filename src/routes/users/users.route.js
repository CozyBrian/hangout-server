const express = require("express");
const apicache = require("apicache");
const { 
  getAllUsers,
  getRandomUsers,
  getUserInfo,
  postAUser,
  updateUserInfo,
  deleteUser,
  getFriends,
  addFriend,
} = require("./users.controller");

const usersRouter = express.Router();

const cache = apicache.middleware;

usersRouter.get('/', cache("15 minutes"), getAllUsers);
usersRouter.get('/random', getRandomUsers);
usersRouter.get('/:id', getUserInfo);
usersRouter.post('/', postAUser);
usersRouter.put('/:id', updateUserInfo);
usersRouter.delete('/:id', deleteUser);
usersRouter.post('/friends/', getFriends);
usersRouter.post('/friends/:id', addFriend);

module.exports = usersRouter;
