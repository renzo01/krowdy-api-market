//import the necesaries libs
const mongoose = require('mongoose');

// TODO: añadir mas validaciones
const productoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'producto debe tener siquira un titulo']
    },
    descripcion:{
        type: String
    },
    stock:{
        type: Number,
        min: 0
    },
    precio: {
        type: Number,
        min: 0,
        required: [true, 'Producto debe tener un precio']
    },
    moneda: {
        type: String,
        minlength: 3,
        maxlength: 3,
        required: [true, `producto debe tene una moneda siempre`]
    },
    owner: {
        type: String,
        required: [true, `producto debe tener un owner`]
    }
});
//the model is component by name and schema
module.exports = mongoose.model('producto',productoSchema);
