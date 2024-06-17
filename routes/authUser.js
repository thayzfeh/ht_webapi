const User = require("../models/User");
const path = require('path');
const express = require('express');

module.exports = async(req, res) =>{
    const id = req.decodedToken.id;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({msg:"usuário não existente!"});
    if(!user.pending) return res.status(404).json({msg: "usuário já registrado!"});
    user.pending = false;
    try{
        user.save();
        res.sendFile(path.resolve(__dirname, '../public/authMail.html'));
    }catch(e){
        console.log('error authorizating register:',e);
    }
}