const mongoose = require('mongoose');

const eventoListaModel = new mongoose.Schema({
    evento: mongoose.SchemaTypes.String,
    data: mongoose.SchemaTypes.String,
    horario: mongoose.SchemaTypes.String,
    embed: {
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
    eventoId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    participantes: {
        type: mongoose.SchemaTypes.Array,
        required: true,
    }
})

module.exports = mongoose.model("eventoListaModel", eventoListaModel);