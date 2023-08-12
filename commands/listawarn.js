const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "listawarn",

    run: async(client, message, args) => {
        if(message.guildId != "1060614825899728986") return;
        if(!message.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
            message.reply("Você não tem permissão!")
        } else {
            let user = message.mentions.members.first()  || message.guild.members.cache.get(args[0])
            if(!user) return message.reply("Membro não especificado!")
            let dados = await report?.find({discordId: user.id}).exec()
            if(dados == false) {
                message.reply(`Usuário <@${user.id}> não está cadastrado.`)
            } else {
                let reportArray = dados[0].report
                let arrayLength = reportArray.length-1.
                let text = ""

                if (arrayLength > 10) {
                    for(i = arrayLength-9; i <= arrayLength; i++){
                        text = text + `${i}° - Data: ${reportArray[i].Data} • Motivo: ${reportArray[i].Motivo}\n`
                    }
                } else{
                    for(i = 1; i <= arrayLength; i++){
                        text = text + `${i}° - Data: ${reportArray[i].Data} • Motivo: ${reportArray[i].Motivo}\n`
                    }
                }

                const exampleEmbed = new Discord.EmbedBuilder()
                .setColor('Random')
                .setDescription(`**Usuário <@${user.id}> tem um total de **${arrayLength} advertências!**\nEssa são as últimas advertências:**\n\n ${text}`)
        
              let msg = await message.channel.send({ embeds: [exampleEmbed] })

  
            }
        }
    }
}
