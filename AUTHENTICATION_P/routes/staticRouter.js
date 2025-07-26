const express = require('express')

const staticRouter = express.Router();

const {handleGetDataFromForm, handleUserLoginDetails, handleredirectUserToFill} = require('../controllers/staticRouter')

staticRouter.get("/signup",handleGetDataFromForm)

staticRouter.get("/signin",handleUserLoginDetails)

staticRouter.get("/new/note",handleredirectUserToFill)
// staticRouter.get("/signup",handleGetDataOfUser);

module.exports = staticRouter;