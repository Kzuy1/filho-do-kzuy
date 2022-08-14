const mongoose = require('mongoose');

const reportModel = new mongoose.Schema({
    nickname: mongoose.SchemaTypes.String,
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    atividade: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    report: {
        type: mongoose.SchemaTypes.Array,
        required: true,
    }

})

module.exports = mongoose.model("report", reportModel);