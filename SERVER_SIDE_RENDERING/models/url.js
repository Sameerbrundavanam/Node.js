const mongoose = require('mongoose')

//Schema
const urlSchema = new mongoose.Schema({
        shortId:{
            type: String,
            required: true,
            unique: true,
        },
        redirectURL:{
            type: String,
            required: true,
        },
        visitHistory: [{ timestamp: {type: Number}}]
    }, 

    {timestamps: true},
);

//Model
const URL = new mongoose.model('urlmodel',urlSchema)

module.exports = URL;