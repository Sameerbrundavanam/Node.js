const express = require('express')

const app = express();

const users = require('./MOCK_DATA-2.json')

//Browsers by default make a GET request

app.get("/users",(req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get("/api/users",(req,res) => {
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
     return res.json({status : "pending"});
})

.delete((req,res) => {
    return res.json({status : "pending"});
});



app.post("/api/users",(req,res) => {
    return res.json({status : "pending"});
})


app.listen(3000,() => {
    console.log("Listening at port: 3000")
})