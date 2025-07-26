const notes = require('../models/notes')
const users = require('../models/users')

async function handleGetDataFromForm(req,res){
    return res.render("signup")
}

// async function handleGetDataOfUser(req,res){
//     return res.render("signup",{
//         name : req.body.name,
//         email: req.body.email,
//         password : req.body.password,
//     })
// }

async function handleUserLoginDetails(req,res){
    return res.render("signin")
}


async function handleredirectUserToFill(req,res){
    return res.render("createUser");
}

module.exports = {
    handleGetDataFromForm,
    handleUserLoginDetails,
    handleredirectUserToFill
}