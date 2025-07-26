const mongoose = require('mongoose')

//Creating the User Schema

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
        unique : true,
    },
    password:{
        type: String,
        required : true,
    }
},{timestamps : true})

//Creating the user Model

const User = mongoose.model("user",userSchema)

module.exports = User