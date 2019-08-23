const Usuario = require('./usuarios.model');

function createUsuario (user) {
    return new Usuario(user).save();
}

function obtenerUsuarios () {
    return Usuario.find({});
}

function obtenerUsuario(username, id){
    if (username) return Usuario.findOne({username: username});
    if (id) return Usuario.findById(id);
}

module.exports = {
    createUsuario,
    obtenerUsuarios,
    obtenerUsuario
}
