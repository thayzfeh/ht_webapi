const Connection = require('../models/Connection')

module.exports = async(req, res, next) =>{
    id = req.decodedToken.id;

    receptor = await Connection.find({
        receptor_id : id
    },'-receptor_id -__v');
    sender = await Connection.find({
        sender_id : id
    },'-sender_id -__v')
    
    req.pendingReceptor = receptor.filter(x => x.pending == true);
    req.receptor = receptor.filter(x => x.pending == false);
    req.pendingSender = sender.filter(x=> x.pending == true);
    req.sender = sender.filter(x => x.pending == false);

    next();
}