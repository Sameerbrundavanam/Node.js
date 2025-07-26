const jwt = require('jsonwebtoken')
const secret = "FTIGGID@sam369"

//const sessionIdToUserMap = new Map();

//This particular function generates tokens for me
function setUser(user){
    //here user is the payload
    return jwt.sign({
        _id : user._id,
        email : user.email,
    },secret)
    // sessionIdToUserMap.set(id,user);
}

function getUser(token){
    // return sessionIdToUserMap.get(id);
    if(!token) return null;
    return jwt.verify(token,secret);
}

module.exports = {
    setUser,
    getUser,
}