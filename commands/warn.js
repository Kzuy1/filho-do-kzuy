const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "warn",

    run: async(client, message, args) => {
        if(message.guildId != "1060614825899728986") return;
        if(!(message.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles) || message.member.roles.cache.has("1028720772539228230"))) {
            message.reply("Você não tem permissão!")
        } else {
            try {args[0] = args[0].replace(/\D/g, '')} catch (error) { }
            let user = await message.guild.members.cache.get(args[0])
            if(!user) return message.reply("Membro não especificado!")
            let motivo = args.join(" ").slice(args[0].length);
            if(!motivo) return message.reply("Motivo do report não especificado!") 
            let dados = await report?.find({discordId: user.id}).exec()
            if(dados == false) {
                message.reply(`Usuário <@${user.id}> não está cadastrado.`)
            } else {
                let reportArray = dados[0].report
                reportArray.push({Data: new Date().toLocaleDateString('en-GB'),Motivo: motivo})
                const  update = await report.findOneAndUpdate(
                    {discordId: user.id},
                    {report: reportArray}
                )
                message.reply(`<@${user.id}> for advertido\n**Motivo:** ${motivo}`)
                let arrayLength = reportArray.length-1 
                if(arrayLength % 3 === 0){
                    message.reply(`<@${user.id}> tem ${arrayLength} advertencias.\nPor favor <@443216944783425546> e <@588023007470026773> dar uma olhada.`)
                    user.roles.add('998054582859079682')
                }
            }
        }

    }
}
