const express = require('express')

const userRouter = express.Router();

const { handleCreateNewUser, handleUserLogin} = require('../controllers/users')

userRouter.post("/signup",handleCreateNewUser);

userRouter.post("/signin",handleUserLogin);

module.exports = userRouter;