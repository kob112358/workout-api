const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    whenCreated: {
        type: Date,
        required: true
    },
    
})

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;