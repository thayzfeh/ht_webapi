const Connection = require("../models/Connection");
const User = require("../models/User");
const userById = require("../selects/userById");

module.exports = (req, res) =>{
    sender = req.sender.map(async(x) =>{
        console.log('showConnection map', x);
        return await userById(x.receptor_id);
    })
    console.log(sender)
    res.status(200).json({sender, receptor : req.receptor})
}