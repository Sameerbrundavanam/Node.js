const mongoose = require('mongoose')


//Creating the userSchema for all the users who will create the notes only when authenticated
const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        }
    }, 

    {timestamps: true},

);

//creating the user model
const users = mongoose.model("usermodel",userSchema)

module.exports = users;