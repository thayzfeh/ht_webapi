const Connection = require("../models/Connection");
const User = require("../models/User");
const userById = require("../selects/userById");

module.exports = async(req, res) =>{
    try {
        const senderPromises = req.sender.map(async (x) => {
            console.log('showConnection map', x);
            return await userById(x.receptor_id);
        });

        const sender = await Promise.all(senderPromises); // Wait for all promises to resolve

        console.log(sender);
        res.status(200).json({ sender, receptor: req.receptor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}