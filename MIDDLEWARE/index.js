const express = require('express')

const app = express();

const users = require('./MOCK_DATA-2.json')

const fs = require('fs')


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

app.get("/users",(req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

    //Those Chnages persist throughout the course of the application's existence

    console.log("I'm in the GET route",req.nyName)
    res.send(html);
})

app.get("/api/users",(req,res) => {

    /*
        adding a custom Header
        Always add X to custom Headers
    */

    res.setHeader("X-My-Header", "Sameer"); 

    /*
        reading the request Header
        const reqHeaders = req.headers;
        console.log(reqHeaders)
    */
    return res.json(users);
})

app
.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    return res.json(users.find(user => user.id === id))
})

.patch((req,res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const idx = users.findIndex(user => user.id === id);
    if(idx === -1){
        return res.json({status: "Failed"})
    }
    users[idx] = {...users[idx],...body};
    fs.writeFile('./MOCK_DATA-2.json',JSON.stringify(users,null,2),(err,data) => {
        if(err){
            return res.json({status : "Error Occured"});
        }
        return res.json({status: "Success", data: users[idx]})
    })
})

.delete((req,res) => {
    const id = Number(req.params.id);
    const idx = users.findIndex(user => user.id === id);
    if(idx === -1){
        return res.json({status: "Failed"})
    }
    //splice -> (1,2) -> 1: index from which, 2: no.of records
    const deletedUser = users.splice(idx,1)[0]
    /*
        JSON.stringify(users, null, 2):
        Converts users to a string
        null, 2 adds pretty formatting (indentation of 2 spaces)
    */
    fs.writeFile('./MOCK_DATA-2.json',JSON.stringify(users,null,2),(err,data) => {
        if(err){
            return res.json({status : "Error Occured"});
        }
        return res.json({status : "Success", deleteduser: deletedUser});
    })
});



app.post("/api/users",(req,res) => {
    const body = req.body;
    users.push({id: users.length+1, ...body})
    fs.writeFile('./MOCK_DATA-2.json',JSON.stringify(users),(err,data) => {
        return res.json({status : "Success", id: `${users.length}`});
    })
})


app.listen(3000,() => {
    console.log("Listening at port: 3000")
})