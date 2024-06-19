const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User')

module.exports = async(req, res) =>{
    const {email, password} = req.body;

    if(!email){
        return res.status(422).json({msg: 'O e-mail é obrigatório!'});
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatória!'});
    }

    //check if user exists
    const user = await User.findOne({email : email});

    if (!user){
        return res.status(404).json({msg: 'Usuário não encontrado.'});
    }


    if(user.pending) return res.status(422).json({msg: 'Finalize seu cadastro!'});

    //check password
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword){
        return res.status(422).json({msg: 'Senha inválida!'});
    }

    try{
        const secret = process.env.SECRET;

        const token = jwt.sign({
            id: user._id,
        }, secret)
        res.status(200).json({token, user});

    }catch(e){
        console.log(e);
        res.status(500).json({msg: e});
    }
}