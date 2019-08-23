const mongoose = require('mongoose');
//this is the schema what use mongose use for format a table
const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Usuario Debe tener un username']
    },
    password: {
        type: String,
        require: [true, 'Usuario debe tener una constraseña']
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('usuario', usuarioSchema);