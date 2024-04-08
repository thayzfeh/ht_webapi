const User = require('../models/User');
const Connection = require('../models/Connection')
module.exports = async(req, res) =>{

    const {receptor} = req.body;
    const sender = req.decodedToken.id;
    
    if(!receptor){
        return res.status(422).json({msg: 'O receptor é obrigatório!'});
    }

    const receptionUser = await User.findOne({username : receptor});
    if(!receptionUser){
        return res.status(404).json({msg: 'Usuário não encontrado!'});
    }

    const receptor_id = receptionUser._id;

    const connection = new Connection({
        sender_id : sender,
        receptor_id
    })
    
    try{
        await connection.save();
        res.status(201).json({msg: 'Conexão criada com sucesso!'});
    }catch(e){
        console.log(e);
        res.status(500).json({msg: `${e}`});
    }
}