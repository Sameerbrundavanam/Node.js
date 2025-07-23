const express = require('express')
const app = express()
const { connectToDB } = require('./connection')
const router = require('./routes/url')
const path = require('path')
const url = require('./models/url')
const staticRouter = require('./routes/staticRouter')


connectToDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log("Mawa Connect Ayyanu"))
.catch(() => console.log("Mawa Verfiy chesuko okka sari"));

//Setting up a View Engine
app.set("view engine", "ejs")

//we are saying to the Node that my views are present here
app.set("views", path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use("/url",router)
app.use("/",router)
app.use("/",staticRouter)




app.listen(3003,() => console.log("I'm observing!!!"))