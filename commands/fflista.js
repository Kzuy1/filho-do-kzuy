const Discord = require("discord.js")
const mongoose = require('mongoose');
const eventosLista = require("../models/eventosLista.js")

module.exports = {
    name: "fnlista",

    run: async(client, message, args) => {
        if(message.guildId != "831483672065736704") return;
        if(!(message.member.permissions.has("MANAGE_ROLES") || message.member.roles.cache.has("895055422732529765") || message.member.roles.cache.has("1015724564111691806"))) {
            message.reply("Você não tem permissão!")
        } else {
            let data = args[0]
            let horario = args[1]
            if(!data) return message.reply("Comando inválido digite k!fflista DD/MM/AAAA HH:MM")
            if(!horario) return message.reply("Comando inválido digite k!fflista DD/MM/AAAA HH:MM")
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Fame Farm`)
            .setDescription(`:calendar_spiral: ${data}\n:clock2: ${horario}\nOrganizador: <@${message.author.id}>`)
            .addFields(
                { name: '\u200B', value: '\u200B'},
                { name: 'Tank (0/1)', value: '-', inline: true },
                { name: 'Healer (0/1)', value: '-', inline: true },
                { name: 'DPS (0/3)', value: '-', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Reserva (0)', value: '-', inline: true },
                { name: 'Não vou mais participar (0)', value: '-', inline: true },
            )

            let msg = await message.channel.send({ embeds: [exampleEmbed] })
            let msgID = msg.id
            let embed = msg.embeds[0]
            msg.react('<:Incubus:965328874546266162>');
            msg.react('<:Cajado_Divino:965329104197001236>');
            msg.react('<:Ranged:970026432002658395>');
            msg.react('<:Reserva:969804985321812038>');
            msg.react('❌');
            const eventosRegistro = await eventosLista.create({
                evento: "famefarm",
                data: data,
                horario: horario,
                eventoId: msgID,
                participantes: [],
                limites: [{"":""},{tank: 0},{healer: 0},{dps: 0},{"":""},{reserva: 0},{nparticipar: 0}],
            })
        }



        
    }
}
