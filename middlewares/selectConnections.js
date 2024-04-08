const Connection = require('../models/Connection')

module.exports = async(req, res, next) =>{
    id = req.decodedToken.id;

    req.receptor = await Connection.find({
        receptor_id : id
    },'-_id -receptor_id -__v');
    req.sender = await Connection.find({
        sender_id : id
    },'-_id -sender_id -__v')

    next();
}