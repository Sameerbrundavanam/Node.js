const { getUser } = require('../service/auth')
async function monitorUserLogin(req,res,next){
    const userId = req.cookies?.uid;
    if(!userId){
        return res.redirect("/notes/web/signin")
    }
    const user = getUser(userId);
    if(!user){
        return res.redirect("/notes/web/signin");
    }
    req.user = user;
    next();
}


async function checkAuth(req,res,next){
    const userId = req.cookies?.uid;
    const user = getUser(userId);
    req.user = user;
    next();
}


module.exports = {
    monitorUserLogin,
    checkAuth,
}