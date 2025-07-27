const User = require('../models/user')
const {v4: uuidv4} = require('uuid')
const {setUser, getUser} = require('../service/auth')

async function handleUserSignUp(req,res){
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({status : "Error", verdict : "Please Provide Complete Data !!!"})
    }
    const result = await User.create({
        name,
        email,
        password
    })
    return res.redirect("/")
}

async function handleUserLogin(req,res){
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({status : "Error", verdict : "Please Provide Complete Data !!!"})
    }
    const user = await User.findOne({ email, password})
    if(!user){
        return res.render('login',{
            error: "Invalid email or password"
        })
    }
    // const sessionId = uuidv4();
    // setUser(sessionId,user);

    const token = setUser(user);

    //Setting a cookie in the response
    res.cookie('token',token);
    return res.redirect("/")
}




module.exports = {
    handleUserSignUp,
    handleUserLogin,
}