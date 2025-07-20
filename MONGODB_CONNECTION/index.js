const express = require('express')

const app = express();


const fs = require('fs')

const mongoose = require('mongoose');
const { timeStamp } = require('console');


//Connection with MongoDB

//This returns a promise
mongoose.connect('mongodb://127.0.0.1:27017/practice-db-1')
//so we have this one below
.then(() => {
    console.log("Connnection established Successfully")
})
.catch((err) => {
    console.log("Error Occured",err);
})


//Schema Designing

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    job_title:{
        type: String,
    },
    gender:{
        type: String,
    }
}, {timestamps: true}
)

//Model Designing

const User = mongoose.model('userModel',userSchema)


//This is a MiddleWare whic can be used as a plug-in
//It deos this duty: Whenever i get the form data it tries to place in the body
//It takes the data, makes it into a JS object adn places it in the req.body
app.use(express.urlencoded({extended : false}));


//creating a custom MiddleWare

app.use((req,res,next) =>{
    console.log("This is a custom middleware");

    //Making chnages to the request - reponse objects
    req.nyName = "Sameer";

    next();
})

app.use((req,res,next) =>{
    fs.appendFile('./log.txt',`${Date.now()} : ${req.method} through ${req.path} with ip ${req.ip}\n`, (err,data) => {
        next();
    })
})

app.use((req,res,next) =>{
    console.log("This is another custom middleware", req.nyName);
    next();
})


//Browsers by default make a GET request

app.get("/users", async (req,res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;

    //Those Chnages persist throughout the course of the application's existence

    console.log("I'm in the GET route",req.nyName)
    res.send(html);
})

app.get("/api/users",async (req,res) => {

    /*
        adding a custom Header
        Always add X to custom Headers
    */

    //res.setHeader("X-My-Header", "Sameer"); 

    /*
        reading the request Header
        const reqHeaders = req.headers;
        console.log(reqHeaders)
    */
    const completeUserData = await User.find({})
    return res.json(completeUserData);
})

app
.route("/api/users/:id")
.get(async(req,res) => {
    const userData = await User.findById(req.params.id)
    // const user = users.find(user => user.id === id)
    if(!userData) return res.status(404).json({status: "Record Not Found"})
    return res.status(200).json({userFound: userData})
})

.patch(async (req,res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName: "Monkey", firstName: "D.Luffy"})
    return res.json({status: "Success"})
    // const id = Number(req.params.id);
    // const body = req.body;
    // const idx = users.findIndex(user => user.id === id);
    // if(idx === -1){
    //     return res.json({status: "Failed"})
    // }
    // users[idx] = {...users[idx],...body};
    // fs.writeFile('./MOCK_DATA-2.json',JSON.stringify(users,null,2),(err,data) => {
    //     if(err){
    //         return res.json({status : "Error Occured"});
    //     }
    //     return res.json({status: "Success", data: users[idx]})
    // })
})

.delete(async(req,res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "Success"})

    // const id = Number(req.params.id);
    // const idx = users.findIndex(user => user.id === id);
    // if(idx === -1){
    //     return res.json({status: "Failed"})
    // }
    //splice -> (1,2) -> 1: index from which, 2: no.of records
    //const deletedUser = users.splice(idx,1)[0]
    /*
        JSON.stringify(users, null, 2):
        Converts users to a string
        null, 2 adds pretty formatting (indentation of 2 spaces)
    */
    // fs.writeFile('./MOCK_DATA-2.json',JSON.stringify(users,null,2),(err,data) => {
    //     if(err){
    //         return res.json({status : "Error Occured"});
    //     }
    //     return res.json({status : "Success", deleteduser: deletedUser});
    // })
});



app.post("/api/users",async(req,res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.gender || !body.email){
        return res.status(400).end("Bro. you are fucked up!!!")
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
        
    })
    return res.status(201).json({status: "Success", data: result})
})


app.listen(3000,() => {
    console.log("Listening at port: 3000")
})