const express = require('express')
const app = express()
const { connectToDB } = require('./connection')
const router = require('./routes/url')


connectToDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log("Mawa Connect Ayyanu"))
.catch(() => console.log("Mawa Verfiy chesuko okka sari"));

app.use(express.json())
app.use("/url",router)
app.use("/",router)


app.listen(3003,() => console.log("I'm observing!!!"))