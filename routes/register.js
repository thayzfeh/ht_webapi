const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async(req, res) =>{
    const {username, cpf, email, password, phone, birth} = req.body;

    //Check if is a valid user
    if(!username){
        return res.status(422).json({msg: 'O nome de usuário é obrigatório!'});
    }
    if(!cpf){
        return res.status(422).json({msg: 'O cpf é obrigatório!'});
    }
    if(!email){
        return res.status(422).json({msg: 'O e-mail é obrigatório!'});
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatória!'});
    }
    if(!phone){
        return res.status(422).json({msg: 'O número é obrigatório!'});
    }
    if(!birth){
        return res.status(422).json({msg: 'A data de nascimento é obrigatória!'});
    }

    //check if user already exists
    const emailExists = await User.findOne({email : email});
    const userExists = await User.findOne({username: username});
    if (emailExists){
        return res.status(422).json({msg: 'O email já está cadastrado!'});
    }
    if (userExists){
        return res.status(422).json({msg: 'O nome de usuário já está cadastrado!'});
    }

    //generate password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create user
    const user = new User({
        username,
        cpf,
        email,
        password: passwordHash,
        phone,
        birth
    })


    //save in database
    try{
        await user.save();
        res.status(201).json({msg: 'Usuário criado com sucesso!'});
    }catch(e){
        console.log(e);
        res.status(500).json({msg: `${e}`});
    }
}