const {getUser} = require('../service/auth')


//Authetication part
function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user = null;
    //Condition when we don't even have a header
    if(!tokenCookie){
        return next();
    }

    //When the flow does not go with the above logic it means that we have an authorization header value and we need to validate it
    const token = tokenCookie;
    const user = getUser(token);
    if(!user){
        return res.redirect("/login")
    }
    req.user = user;
    return next();


}

//Authorization part

//Closure function
function restrictTo(roles = []){
    return function(req,res,next){
        //If you are not a loggeduser you will be redirected to the login page
        if(!req.user) return res.redirect("/login")

        //You are a logged in user but you don't have the permission to access a resource
        if(!roles.includes(req.user.role)){
            return res.end("UnAuthorized");
        }    

        //If you are a logged in user and do have the permission to access the resource then just
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}


// async function restrictToLoggedInUserOnly(req,res,next){
//     const userUid = req.headers["authorization"];
//     if(!userUid){
//         return res.redirect("/login")
//     }
//     const token = userUid.split('Bearer ')[1] //userUid -> "Bearer [7346384768237734]"
//     const user = getUser(token);
//     if(!user){
//         return res.redirect("/login")
//     }
//     req.user = user;
//     next();
// }


// async function checkAuth(req,res,next){
//     // const userUid = req.cookies?.uid;
//      const userUid = req.headers["authorization"];
//      const token = userUid.split('Bearer ')[1]
//     const user = getUser(token);
//     req.user = user;
//     next();
// }