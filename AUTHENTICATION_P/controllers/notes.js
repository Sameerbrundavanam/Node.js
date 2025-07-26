const notes = require('../models/notes')

async function handleCreateNewNote(req,res){
    const body = req.body;
    if(!body || !body.title || !body.description){
        return res.status(400).json({status: "Please send complete Data !!!!"})
    }
    const result = await notes.create({
        title: body.title,
        description: body.description,
        createdBy : req.user._id,
    })
    return res.status(201).json({status: "Success", dataCreated : result})
}


async function handleGetAllNotes(req,res){
    if(!req.user) return res.redirect("/notes/web/signup");
    const allNotes = await notes.find({ createdBy : req.user._id})
    if(!allNotes){
        return res.status(404).json({status: "Data Not Found !!!"})
    }
    return res.status(200).json({status: "Success", dataFound : allNotes})
}


async function handleGetSingleNote(req,res){
    const id = req.params.id;
    const result = await notes.findOne({_id: id})
    if(!result){
        return res.status(404).json({status: "Data Not Found !!!"})
    }
    return res.status(200).json({status: "Success", dataFoundIs: result})
}

async function handleEditNote(req,res){
    const id = req.params.id;
    const body = req.body;
    if(!body || !body.title || !body.description){
        return res.status(400).json({status: "Please send complete Data !!!!"})
    }
    const result = await notes.findByIdAndUpdate(
        {_id : id},
        {
            $set:
            {
                title: body.title,
                description : body.description
            }
        },
        {new : true},
    );
    if(!result) return res.status(404).json({status: "Error", message: "The Corresponding ID does not exist in the Database"})
    return res.status(201).json({status: "Success", dataModified: result})
}


async function handleDeleteNote(req,res){
    const id = req.params.id;
    const result = await notes.findByIdAndDelete(id);
    if(!result){
        return res.status(404).json({status: "Data Not Found!!!"});
    }
    return res.status(200).json({status: "Success", dataDeleted: result})
}

module.exports = {
    handleCreateNewNote,
    handleGetSingleNote,
    handleGetAllNotes,
    handleEditNote,
    handleDeleteNote
}