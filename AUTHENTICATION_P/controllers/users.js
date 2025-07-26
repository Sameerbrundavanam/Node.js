const users = require('../models/users')
const {v4: uuidv4} = require('uuid')
const { setUser, getUser } = require('../service/auth')

async function handleCreateNewUser(req,res){
    const {name, email, password} = req.body;
    const body = req.body;
    if(!body || !body.name || !body.email || !body.password){
        return res.status(400).json({status: "Error", message: "Please provide Complete Data"});
    }
    const result = await users.create({
        name,
        email,
        password
    })
    return res.render("signup");
}

async function handleUserLogin(req,res){
    const body = req.body;
    if(!body){
        return res.status(400).json({status: "Failure !!!!"});
    }
    const {email, password } = req.body;
    const user = await users.findOne({email, password});
    if(!user){
        return res.status(400).json({status: "Error !!!"})
    }
    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/notes/data/all")
}



module.exports = {
    handleCreateNewUser,
    handleUserLogin,
}