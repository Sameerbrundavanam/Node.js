const mongoose = require('mongoose')

//Establishing the connection with the MongoDB

async function dbConnection(url){
    return mongoose.connect(url);
}

module.exports = {
    dbConnection,
}