const Discord = require("discord.js")
const mongoose = require('mongoose');
const allyNames = require("../models/allyNames.js")

module.exports = {
    name: "addguild",

    run: async(client, message, args) => {
        if(message.author.id != "307683313982767104") return message.reply("Somente o Kzuy pode utilizar esse comando!");
        try {args[0] = args[0].replace(/\D/g, '')} catch (error) { }
        let guildRoleId = args[0]
        if(!guildRoleId) return message.reply("Role não especificada! k!addguild <@RoleGuild> <1-2> <NameGuild> <IdRoleAlly>");
        let allly = args[1];
        if(!allly) return message.reply("Aliança não especificada! k!addguild <@RoleGuild> <1-2> <NameGuild> <IdRoleAlly>");
        let nameGuild = args[2];
        if(!nameGuild) return message.reply("Nome da Guilda não especificada! k!addguild <@RoleGuild> <1-2> <NameGuild> <IdRoleAlly>");
        let allyRoleId = args[3].replace(/\D/g, '')
        if(!allyRoleId) return message.reply("ID da Role da Ally não especificada! k!addguild <@RoleGuild> <1-2> <NameGuild> <IdRoleAlly>");

        let procurar
        switch (allly){
            case "1":
                procurar = "guildNames"
            break
            
            case "2":
                procurar = "guildNames2"
            break

            default:
                return message.reply("Aliança não especificada! k!addguild <@RoleGuild> <1-2> <NameGuild> <IdRoleAlly>");
        }

        let dados = await allyNames?.find({guildName: procurar}).exec()
        let guildInfos = dados[0].guildInfo
        guildInfos.push({guildId: message.guildId, guildName: nameGuild, guildRole: guildRoleId, allyRoleId: allyRoleId})

        const  update = await allyNames.findOneAndUpdate(
            {guildName: procurar},
            {guildInfo: guildInfos},
        )
        message.reply(`Guild ${nameGuild} adicionada a Ally!`)
        
    }
}

