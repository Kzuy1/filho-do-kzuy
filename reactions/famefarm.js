const Discord = require("discord.js")
const eventosLista = require("../models/eventosLista.js")

module.exports = {
    name: "famefarm",

    run: async(client,dados,consulta) => {
        if (dados.t == "MESSAGE_REACTION_REMOVE") return
        if(dados.d.user_id == "972697835856334858" || dados.d.user_id == "970043993914237038") return
        let participantes = consulta[0].participantes
        let limites = consulta[0].limites
        if(participantes.includes(dados.d.user_id)) return
        
        let msg = await client.channels.cache.get(dados.d.channel_id).messages.fetch(dados.d.message_id)
        let embed = msg.embeds[0]

        if(dados.d.emoji.id === "965328874546266162" && limites[0].tank < 1) {
            embed.fields[1].name = `Tank (${limites[0].tank+1}/1)`
            embed.fields[1].value = `<@${dados.d.user_id}>\n`

            limites[0].tank = limites[0].tank +1
            participantes.push(dados.d.user_id)
        }

        if(dados.d.emoji.id === "965329104197001236" && limites[1].healer < 1) {
            embed.fields[2].name = `Healer (${limites[1].healer+1}/1)`
            embed.fields[2].value = `<@${dados.d.user_id}>\n`

            limites[1].healer = limites[1].healer +1
            participantes.push(dados.d.user_id)
        }

        if(dados.d.emoji.id === "970026432002658395" && limites[2].dps < 3) {
            embed.fields[3].name = `DPS (${limites[2].dps+1}/3)`
            if(limites[2].dps == 0){
                embed.fields[3].value = `<@${dados.d.user_id}>`
            } else{
                embed.fields[3].value = embed.fields[3].value + `\n<@${dados.d.user_id}>`
            }
            
            limites[2].dps = limites[2].dps +1
            participantes.push(dados.d.user_id)
        }

        if(dados.d.emoji.id === "969804985321812038") {
            embed.fields[5].name = `Reserva (${limites[3].reserva+1})`
            if(limites[3].reserva == 0){
                embed.fields[5].value = `<@${dados.d.user_id}>`
            } else{
                embed.fields[5].value = embed.fields[5].value + `\n<@${dados.d.user_id}>`
            }
            
            limites[3].reserva = limites[3].reserva +1
            participantes.push(dados.d.user_id)
        }
        
        const update = await eventosLista.findOneAndUpdate(
            { eventoId: dados.d.message_id},
            {
                participantes: participantes,
                limites: limites,
            }
        )
        
        msg.edit({ embeds: [embed] })

    }
}

