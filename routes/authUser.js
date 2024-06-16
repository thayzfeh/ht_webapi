const User = require("../models/User");

module.exports = async(req, res) =>{
    const id = req.decodedToken.id;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({msg:"usuário não existente!"});
    if(!user.pending) return res.status(404).json({msg: "usuário já registrado!"});
    user.pending = false;
    try{
        user.save();
        //mexer a partir daqui!!!!!!!!!!!
    }catch(e){
        //MEXER AQUI TAMBÉM
    }
}