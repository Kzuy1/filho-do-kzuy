// const Discord = require("discord.js")
// const mongoose = require('mongoose');
// const eventosLista = require("../models/eventosLista.js")

// module.exports = {
//     name: "warn",

//     run: async(client, message, args) => {
//         if(message.guildId != "831483672065736704") return;
//         if(!(message.member.permissions.has("MANAGE_ROLES") || message.member.roles.cache.has("895055422732529765"))) {
//             message.reply("Você não tem permissão!")
//         } else {
//             let data = args[0]
//             let horario = args[1]
//             if(!data) return message.reply("Comando inválido digite k!wblista DD/MM/AAAA HH:MM")
//             if(!horario) return message.reply("Comando inválido digite k!wblista DD/MM/AAAA HH:MM")
//             const exampleEmbed = new Discord.MessageEmbed()
//             .setColor('RANDOM')
//             .setTitle('World Boss')
//             .setDescription(`:calendar_spiral: ${data}\n:clock2: ${horario}`)
//             .addFields(
//                 { name: '\u200B', value: '\u200B' },
//                 { name: 'Tank (0/1)', value: '-', inline: true },
//                 { name: 'Main Healer (0/1)', value: '-', inline: true },
//                 { name: 'Healer PT (0/1)', value: '-', inline: true },
//                 { name: 'Ranged DPS (0/4)', value: '-', inline: true },
//                 { name: 'Fugurante (0/1)', value: '-', inline: true },
//                 { name: 'Enigmático (0/1)', value: '-', inline: true },
//                 { name: '\u200B', value: '\u200B' },
//                 { name: 'Reserva (0)', value: '-', inline: true },
//                 { name: 'Não vou mais participar (0)', value: '-', inline: true },
//             )

//             let msg = await message.channel.send({ embeds: [exampleEmbed] })
//             let msgID = msg.id
//             msg.react('<:Incubus:965328874546266162>');
//             msg.react('<:Cajado_Divino:965329104197001236>');
//             msg.react('<:Cajado_Corrompido:965329345864421413>');
//             msg.react('<:Ranged:970026432002658395>');
//             msg.react('<:Cajado_Fugurante:965331964867530892>');
//             msg.react('<:Cajado_Enigmatico:965329447337218168>');
//             msg.react('<:Reserva:969804985321812038>');
//             msg.react('❌');
//             const eventosRegistro = await eventosLista.create({
//                 evento: "worldboss",
//                 eventoId: msgID,
//                 participantes: "",
//             })
//         }



        
//     }
// }
