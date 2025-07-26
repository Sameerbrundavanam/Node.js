const express = require('express')
const router = new express.Router();
const { handleGenerateNewShortURL, handleRedirectToOriginalURL, handleGetAnalyticsOfViews } = require('../controllers/url')

router.post("/",handleGenerateNewShortURL)
router.get("/:shortId",handleRedirectToOriginalURL);
router.get("/analytics/:shortId",handleGetAnalyticsOfViews);



module.exports = router;