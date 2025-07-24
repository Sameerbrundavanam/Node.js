const express = require('express')
const {dbConnection} = require('./connection')
const router = require('./routes/notes')

//the instance of the express
const app = express();

//Making it use the MiddleWare
app.use(express.urlencoded({extended : false}))
app.use(express.json())

dbConnection('mongodb://127.0.0.1:27017/notesdb')
.then(() => console.log("Mawa, I'm Working"))
.catch((err) => console.log("mawa, Okka sari Choodu"))

app.use("/notes",router)

app.listen(8000,() => console.log("Yesss!!!"))


