const Discord = require("discord.js")
const eventosLista = require("../models/eventosLista.js")

module.exports = {
    name: "famefarm",

    run: async(client,dados) => {
        let consulta = await eventosLista?.find({eventoId: dados.d.message_id}).exec()
        let embed = consulta[0].embed[0]
        let msg = await client.channels.cache.get(dados.d.channel_id).messages.fetch(dados.d.message_id);
        // console.log(msg.embeds[0].fields)
        // embed.fields[1].value = "Teste"
        msg.edit({ embeds: [embed] })

    }
}

