const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username : String,
    cpf: String,
    email : String,
    password : String,
    phone: String,
    birth: String
})

module.exports = User;