const mongoose = require('mongoose')

async function dbConnection(url){
    mongoose.connect(url);
}

module.exports = {
    dbConnection,
}