const express = require('express')

const userRouter = express.Router();

const { handleUserSignUp, handleUserLogin } = require('../controllers/user')

userRouter.post("/",handleUserSignUp)
userRouter.post("/login",handleUserLogin)

module.exports = userRouter