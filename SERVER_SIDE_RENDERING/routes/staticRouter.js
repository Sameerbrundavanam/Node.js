//This is the static router that is used by the static web page

const express = require('express')
const staticRouter = new express.Router();
const { handleStaticHTML } = require('../controllers/staticRouter')

staticRouter.get("/",handleStaticHTML)
staticRouter.get("/signup", async (req,res) => {
    return res.render("signup")
})

staticRouter.get("/login", async (req,res) => {
    return res.render("login")
})

module.exports = staticRouter;