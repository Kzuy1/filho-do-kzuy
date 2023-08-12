const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "removewarn",

    run: async(client, message, args) => {
        if (message.guildId != "1060614825899728986") return;
        if(message.author.id != "307683313982767104") return message.reply("Somente o Kzuy pode utilizar esse comando!");
        if(!message.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
            message.reply("Você não tem permissão!")
        } else {
            try {args[0] = args[0].replace(/\D/g, '')} catch (error) { }
            let user = await message.guild.members.cache.get(args[0])
            if(!user) return message.reply("Membro não especificado!")
            let motivo = args.join(" ").slice(args[0].length);
            if(!motivo) return message.reply("Posição do report não especificado!") 
            let dados = await report?.find({discordId: user.id}).exec()
            if(dados == false) {
                message.reply(`Usuário <@${user.id}> não está cadastrado.`)
            } else {
                let reportArray = dados[0].report
                reportArray.splice(motivo,1)
                const update = await report.findOneAndUpdate(
                    {discordId: user.id},
                    {report: reportArray}
                )
                message.reply("Warn removido!")
              
            }
        }




        
    }
}
