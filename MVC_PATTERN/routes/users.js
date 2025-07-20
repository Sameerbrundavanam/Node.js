const express = require('express')
const { handleGetAllUsers, handleGetUserByID, handleCreateNewUser, hadnleUpdateUserByID, handleDeleteUserByID } = require('../controllers/users')
const router = express.Router()

//Attching the handlers to the Routes

router
.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)

router
.route("/:id")
.get(handleGetUserByID)
.patch(hadnleUpdateUserByID)
.delete(handleDeleteUserByID)

module.exports = router;