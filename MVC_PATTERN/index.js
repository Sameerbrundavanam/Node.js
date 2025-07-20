const express = require('express')
const mongoose = require('mongoose')
const userData = require('./models/users')
const userRouter = require('./routes/users')
const {dbConnection} = require('./connection')
const {createLog} = require('./middlewares')

//creating an instance of Express
const app = express();

//DB Connection
dbConnection('mongodb://127.0.0.1:27017/MVC-Data')
.then(() => console.log("Connection Successful"))
.catch((err) => console.log("Connection Failed",err))

//using the MiddleWare for getting the body
app.use(express.urlencoded({extended: true}))
app.use(createLog('./log.txt'))

//We are saying that whatever request we get to /api/user (starts) use the userRouter
app.use("/api/users",userRouter)

.listen(8000,() => console.log("Mawa, Nenu Vintunnanu"));