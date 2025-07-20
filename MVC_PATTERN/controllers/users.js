const express = require('express')
const userData = require('../models/users')

async function handleGetAllUsers(req,res){
    const allRegUsers = await userData.find({});
    return res.status(200).json(allRegUsers);
}

async function handleGetUserByID(req,res){
    const regUser = await userData.findById(req.params.id)
    if(!regUser){
        return res.status(404).end("User Not Found");
    }
    return res.status(200).json(regUser);
}

async function handleCreateNewUser(req,res){
    const body = req.body;
    console.log(body);
    if(!body || !body.firstName || !body.email || !body.phno){
        return res.status(404).json({verdict: "Sorry, Please provide complete details"});
    }
    const result = await userData.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phno: req.body.phno,
    })
    return res.status(201).json({status: "Successfully Created", data: result});
}

async function hadnleUpdateUserByID(req,res){
    const userID = req.params.id;
    const body = req.body;
    const updatedUser = await userData.findByIdAndUpdate(userID,body, {new: true})
    if(!updatedUser){
        return res.status(404).json({status: "Details Not Found"});
    }
    return res.status(200).json({status: "Successfully updated", newData: updatedUser})
}

async function handleDeleteUserByID(req,res){
     const userID = req.params.id;
    const deleteuser = await userData.findByIdAndDelete(userID);
    if(!deleteuser){
        return res.status(404).json({statu: "Error occured mawa"});
    }
    return res.status(200).json({status: "Succesfully deletd the user", user: deleteuser})
}


module.exports = {
    handleGetAllUsers,
    handleGetUserByID,
    handleCreateNewUser,
    hadnleUpdateUserByID,
    handleDeleteUserByID,
}