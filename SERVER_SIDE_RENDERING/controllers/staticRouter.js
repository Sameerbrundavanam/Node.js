const url = require('../models/url')
async function handleStaticHTML(req,res){
    if(!req.user){
        return res.redirect("/login")
    }
    const allURLData = await url.find({ createdBy: req.user._id});
    return res.render("home",{
        urls:allURLData
    })
}

module.exports = {
    handleStaticHTML,
}