const express = require('express')
const mongoose = require('mongoose')


//creating an instance of Express
const app = express();

//using the MiddleWare for getting the body

app.use(express.urlencoded({extended: true}))


//Establishing the connection with the MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MVC-Data')
.then(() => console.log("Connection Established"))
.catch((err) => console.log("Error", err))


//Creating the Schema of the Collection

const MVCSchema = mongoose.Schema({
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
    phno:{
        type: Number,
        required: true,
    },
}, {timestamps: true})


//Creating the Model

const userData = mongoose.model('MVC-Model',MVCSchema)


//Creating theb Routes

//GET routes

app.get("/all/users",async(req,res) =>{
    const allRegUsers = await userData.find({})
    if(!allRegUsers) return res.status(404).end("No Data Found");
    const html = `
    <ul>
    ${allRegUsers.map((user) => `<li> ${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    return res.status(200).send(html)
})


app.get("/api/all/users", async(req,res) => {
    const allRegUsers = await userData.find({});
    return res.status(200).json(allRegUsers);
})

app.get("/api/users/:id", async(req,res) => {
    const regUser = await userData.findById(req.params.id)
    if(!regUser){
        return res.status(404).end("User Nout Found");
    }
    return res.status(200).json(regUser);
})


//POST routes

app.post("/api/reg/user", async(req,res) => {
    const body = req.body;
    console.log(body);
    if(!body || !body.firstName || !body.email || !body.phno){
        return res.status(404).json({verdict: "Sorry, Please provide complete details"});
    }
    const result = await userData.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phno: req.body.phno,
    })
    return res.status(201).json({status: "Successfully Created", data: result});
})


//PATCH routes

app.patch("/api/user/update/:id", async(req,res) => {
    const userID = req.params.id;
    const body = req.body;
    const updatedUser = await userData.findByIdAndUpdate(userID,body, {new: true})
    if(!updatedUser){
        return res.status(404).json({status: "Details Not Found"});
    }
    return res.status(200).json({status: "Successfully updated", newData: updatedUser})
})


//Delete routes

app.delete("/api/user/delete/:id", async(req,res) => {
    const userID = req.params.id;
    const deleteuser = await userData.findByIdAndDelete(userID);
    if(!deleteuser){
        return res.status(404).json({statu: "Error occured mawa"});
    }
    return res.status(200).json({status: "Succesfully deletd the user", user: deleteuser})
})

.listen(8000,() => {
    console.log("Mawa, Nenu Vintunnanu")
})