const User = require('../models/User');
const Connection = require('../models/Connection');

module.exports = async(req, res)  =>{
    const {receptor} = req.body;
    const sender = req.decodedToken.id;

    if(!receptor) return res.status(422).json({msg: "O receptor é obrigatório!"});

    const user = await User.findOne({
        username : receptor
    });
    if(!user) return res.status(404).json({msg: "Usuário não encontrado!"});

    const hasConnection = await Connection.deleteOne({
        sender_id : sender,
        receptor_id : user._id
    });
    console.log(hasConnection);
    res.status(201).json({msg: "conexão deletada com sucesso!"})
}