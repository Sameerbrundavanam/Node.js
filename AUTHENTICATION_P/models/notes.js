const mongoose = require('mongoose')

//Creating the Schema

const notesSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 100,
    },
    description:{
        type: String,
        required: true,
        minlength: 20,
        maxlength: 1000,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    }
}, {timestamps: true});


//Creating the Model

const notes = mongoose.model("notesmodel",notesSchema)

module.exports = notes;