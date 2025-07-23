const url = require('../models/url')
async function handleStaticHTML(req,res){
    const allURLData = await url.find({});
    return res.render("home",{
        urls:allURLData
    })
}

module.exports = {
    handleStaticHTML,
}