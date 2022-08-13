const express = require("express");
const { postSignIn, postSignUP, refreshUsertoken, userLogOut } = require("./auth.controller.js");

const authRouter = express.Router();

authRouter.post('/signUp', postSignUP);
authRouter.post('/signIn', postSignIn);
authRouter.post('/refresh', refreshUsertoken);
authRouter.post('/logout', userLogOut);
// TODO LOGOUT


module.exports = authRouter;