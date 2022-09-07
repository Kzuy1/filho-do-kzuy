const Discord = require("discord.js")
const mongoose = require('mongoose');
const eventosLista = require("../models/eventosLista.js")

module.exports = {
    name: "lista",

    run: async(client, message, args) => {
        if(message.guildId != "831483672065736704") return;
        if(!(message.member.permissions.has("MANAGE_ROLES") || message.member.roles.cache.has("895055422732529765") || message.member.roles.cache.has("1015724564111691806"))) {
            message.reply("Você não tem permissão!")
        } else {
            let template = args[0]
            let data = args[1]
            let horario = args[2]
            if(!template) return message.reply("Comando inválido digite k!lista <NuméroTemplate> DD/MM/AAAA HH:MM\nk!template para ver os templates")
            if(!data) return message.reply("Comando inválido digite k!lista <NuméroTemplate> DD/MM/AAAA HH:MM\nk!template para ver os templates")
            if(!horario) return message.reply("Comando inválido digite k!lista <NuméroTemplate> DD/MM/AAAA HH:MM\nk!template para ver os templates")

            async function fameFarmx5() {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Fame Farm X5`)
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
                msg.react('<:Incubus:965328874546266162>');
                msg.react('<:Cajado_Divino:965329104197001236>');
                msg.react('<:Ranged:970026432002658395>');
                msg.react('<:Reserva:969804985321812038>');
                msg.react('❌');
                const eventosRegistro = eventosLista.create({
                    evento: "famefarmx5",
                    data: data,
                    horario: horario,
                    eventoId: msgID,
                    participantes: [],
                    limites: [{"":""},{tank: 0},{healer: 0},{dps: 0},{"":""},{reserva: 0},{nparticipar: 0}],
                })
            }

            
            async function fameFarmx10() {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Fame Farm X10`)
                .setDescription(`:calendar_spiral: ${data}\n:clock2: ${horario}\nOrganizador: <@${message.author.id}>`)
                .addFields(
                    { name: '\u200B', value: '\u200B'},
                    { name: 'Tank (0/1)', value: '-', inline: true },
                    { name: 'Main Healer (0/1)', value: '-', inline: true },
                    { name: 'Party Healer (0/1)', value: '-', inline: true },
                    { name: 'Badon (0/1)', value: '-', inline: true },
                    { name: 'Suporte (0/1)', value: '-', inline: true },
                    { name: 'DPS (0/5)', value: '-', inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Reserva (0)', value: '-', inline: true },
                    { name: 'Não vou mais participar (0)', value: '-', inline: true },
                )
    
                let msg = await message.channel.send({ embeds: [exampleEmbed] })
                let msgID = msg.id
                msg.react('<:Incubus:965328874546266162>');
                msg.react('<:Cajado_Divino:965329104197001236>');
                msg.react('<:Cajado_Corrompido:965329345864421413>');
                msg.react('<:Badonico:1017209196703395932>');
                msg.react('<:Suporte:965321528008900649>');
                msg.react('<:Ranged:970026432002658395>');
                msg.react('<:Reserva:969804985321812038>');
                msg.react('❌');
                const eventosRegistro = eventosLista.create({
                    evento: "famefarmx10",
                    data: data,
                    horario: horario,
                    eventoId: msgID,
                    participantes: [],
                    limites: [{"":""},{tank: 0},{mainHealer: 0},{partyHealer: 0},{badon: 0},{suporte: 0},{dps: 0},{"":""},{reserva: 0},{nparticipar: 0}],
                })
            }

            switch (args[0]){
                case "1":
                    fameFarmx5()
                    break
                case "2":
                    fameFarmx10()
                    break
            }   

        }



        
    }
}
