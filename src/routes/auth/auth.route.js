const express = require("express");
const { postSignIn, postSignUP, refreshUsertoken } = require("./auth.controller.js");

const authRouter = express.Router();

authRouter.post('/signUp', postSignUP);
authRouter.post('/signIn', postSignIn);
authRouter.post('/refresh', refreshUsertoken);


module.exports = authRouter;