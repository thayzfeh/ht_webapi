const Connection = require('../models/Connection');

module.exports = async(req, res) => {
    const receptor = req.decodedToken.id;
    const {connectionId} = req.body;

    if(!connectionId) return res.status(422).json({msg:"ID da conexão é obrigatório!"});

    const connection = await Connection.findById(connectionId);
    if(!connection) return res.status(404).json({msg: "Conexão não encontrada!"});

    if(connection.receptor_id != receptor) return res.status(401).json({msg:"Acesso negado!"});

    if(!connection.pending) return res.status(422).json({msg:"Conexão já ativa!"});


    connection.pending = false;
    try{
        await connection.save();
        return res.status(200).json({msg: "Conexão autorizada!"});
    }catch(e){
        console.log("error authorizing connection ID", connectionId, "error:", e);
        return res.status(500).json({msg: "Erro ao autorizar conexão!"});
    }
    

}