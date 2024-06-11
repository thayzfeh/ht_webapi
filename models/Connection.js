const mongoose = require('mongoose');

const Connection = mongoose.model('Connection', {
    sender_id : String,
    receptor_id : String,
    pending: Boolean
});

module.exports = Connection;