const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "listawarn",

    run: async(client, message, args) => {
        if(message.guildId != "831483672065736704") return;
        if(!message.member.permissions.has("MANAGE_ROLES")) {
            message.reply("Você não tem permissão!")
        } else {
            let user = message.mentions.members.first()  || message.guild.members.cache.get(args[0])
            if(!user) return message.reply("Membro não especificado!")
            let dados = await report?.find({discordId: user.id}).exec()
            if(dados == false) {
                message.reply(`Usuário <@${user.id}> não está cadastrado.`)
            } else {
                let reportArray = dados[0].report
                let arrayLength = reportArray.length-1
                if (arrayLength > 10) {
                    message.channel.send(`Usuário <@${user.id}> tem um total de **${arrayLength} advertências!**\nEssa são as últimas 10 advertências:`)
                    for(i = arrayLength-9; i <= arrayLength; i++){
                        message.channel.send(`Data: ${reportArray[i].Data} • Motivo: ${reportArray[i].Motivo}`)
                    }
                } else{
                    message.channel.send(`Usuário <@${user.id}> tem um total de **${arrayLength} advertencias!**`)
                    for(i = 1; i <= arrayLength; i++){
                        message.channel.send(`Data: ${reportArray[i].Data} • Motivo: ${reportArray[i].Motivo}`)
                    }
                }

  
            }
        }




        
    }
}
