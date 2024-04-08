const Connection = require("../models/Connection");
const User = require("../models/User");
const userById = require("../selects/userById");

module.exports = async(req, res) =>{
    sender = await req.sender.map(async(x) =>{
        return await userById(x.receptor_id);
    })
    console.log(sender)
    res.status(200).json({sender, receptor : req.receptor})
}