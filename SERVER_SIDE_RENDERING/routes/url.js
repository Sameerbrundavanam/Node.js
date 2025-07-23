const express = require('express')
const router = new express.Router();
const { handleGenerateNewShortURL, handleRedirectToOriginalURL, handleGetAnalyticsOfViews } = require('../controllers/url')

router.post("/",handleGenerateNewShortURL)
router.get("/url/:shortId",handleRedirectToOriginalURL);
router.get("/analytics/:id",handleGetAnalyticsOfViews);



module.exports = router;