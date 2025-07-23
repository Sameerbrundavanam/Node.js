const shortid = require('shortid')
const url = require('../models/url')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.redirectURL){
        return res.status(400).json({status: "Error", message: "URL is required !!!"});
    }
    //Generates a short ID of 8 characters
    const shortID = shortid();
    const result = await url.create({
        shortId : shortID,
        redirectURL: body.redirectURL,
        visitHistory: [],
    });
    return res.render("home",{
        id: shortID,
    })
    return res.status(200).json({status: "Success", id : shortID});
}

async function handleRedirectToOriginalURL(req,res){
    const shortId = req.params.shortId;
    const redirectURL = url.redirectURL;
    const entry = await url.findOneAndUpdate({
        shortId,
    },{
        $push: {
            visitHistory : {timestamp : Date.now()},
        }
    });
    return res.redirect(entry.redirectURL);
}

async function handleGetAnalyticsOfViews(req,res){
    const shortId = req.params.id;
    const result = await url.findOne({shortId});
    console.log(result)
    if(!result){
        return res.status(404).json({status : "Failure", message: "Data Not Found !!!"});
    }
    return res.json({
        TotalVisits: result.visitHistory.length,
        VisitHistory: result.visitHistory,
    });

}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectToOriginalURL,
    handleGetAnalyticsOfViews,
}