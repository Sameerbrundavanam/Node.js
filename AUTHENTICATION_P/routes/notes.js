const express = require('express')
const router = express.Router();
const {handleGetAllNotes, handleGetSingleNote, handleCreateNewNote, handleDeleteNote, handleEditNote} = require('../controllers/notes')

//GET routes
router.get("/all",handleGetAllNotes);
router.get("/:id",handleGetSingleNote);

//POST route
router.post("/new",handleCreateNewNote);

//PATCH route
router.patch("/edit/:id",handleEditNote);


//DELETE route

router.delete("/delete/:id",handleDeleteNote);




module.exports = router;