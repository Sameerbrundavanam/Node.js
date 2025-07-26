const express = require('express')
const {dbConnection} = require('./connection')
const router = require('./routes/notes')
const staticRouter = require('./routes/staticRouter')
const userRouter = require('./routes/users')
const path = require('path')
const notes = require('./models/notes')
const cookieParser = require('cookie-parser')
const {monitorUserLogin, checkAuth} = require('./middleware/auth')

//the instance of the express
const app = express();

//Making it use the MiddleWare
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cookieParser())

app.set("view engine","ejs")


dbConnection('mongodb://127.0.0.1:27017/notesdb')
.then(() => console.log("Mawa, I'm Working"))
.catch((err) => console.log("mawa, Okka sari Choodu"))

app.use("/notes/data",monitorUserLogin,router)
app.use("/notes/web",staticRouter)
app.use("/notes/user",checkAuth,userRouter);

app.listen(8000,() => console.log("Yesss!!!"))


