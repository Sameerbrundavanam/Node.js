const mongoose = require('mongoose')

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

module.exports = userData;