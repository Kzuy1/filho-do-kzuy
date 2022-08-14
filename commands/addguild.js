const Discord = require("discord.js")
const mongoose = require('mongoose');
const allyNames = require("../models/allyNames.js")

module.exports = {
    name: "addguild",

    run: async(client, message, args) => {
        if(message.author.id != "307683313982767104") return message.reply("Somente o Kzuy pode utilizar esse comando!");
        try {args[0] = args[0].replace(/\D/g, '')} catch (error) { }
        let guildRoleId = args[0]
        if(!guildRoleId) return message.reply("Role não especificada! k!addguild <@RoleGuild> <NameGuild> <IdRoleAlly>");
        let nameGuild = args[1];
        if(!nameGuild) return message.reply("Nome da Guilda não especificada! k!addguild <@RoleGuild> <NameGuild> <IdRoleAlly>");
        let allyRoleId = args[2].replace(/\D/g, '')
        if(!allyRoleId) return message.reply("ID da Role da Ally não especificada! k!addguild <@RoleGuild> <NameGuild> <IdRoleAlly>");

        let dados = await allyNames?.find({guildName: "guildNames"}).exec()
        let guildInfos = dados[0].guildInfo
        guildInfos.push({guildId: message.guildId, guildName: nameGuild, guildRole: guildRoleId, allyRoleId: allyRoleId})

        const  update = await allyNames.findOneAndUpdate(
            {guildName: "guildNames"},
            {guildInfo: guildInfos},
        )
        message.reply(`Guild ${nameGuild} adicionada a Ally!`)
        
    }
}

