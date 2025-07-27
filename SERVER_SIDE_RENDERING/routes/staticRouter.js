//This is the static router that is used by the static web page

const express = require('express')
const staticRouter = new express.Router();
const { handleStaticHTML, handleAdmin} = require('../controllers/staticRouter')
const {restrictTo} = require('../middleware/auth')



staticRouter.get("/admin/urls",restrictTo(["ADMIN",""]),handleAdmin)

//Calling an Inline Middleware
staticRouter.get("/",restrictTo(["NORMAL","ADMIN"]),handleStaticHTML)
staticRouter.get("/signup", async (req,res) => {
    return res.render("signup")
})

staticRouter.get("/login", async (req,res) => {
    return res.render("login")
})

module.exports = staticRouter;