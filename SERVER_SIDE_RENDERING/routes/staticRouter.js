//This is the static router that is used by the static web page

const express = require('express')
const staticRouter = new express.Router();
const { handleStaticHTML } = require('../controllers/staticRouter')

staticRouter.get("/test",handleStaticHTML)

module.exports = staticRouter;