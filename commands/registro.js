const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "registro",

    run: async(client, message, args) => {

        if(!(message.guildId != "831483672065736704" || message.guildId != "1060614825899728986")) return
        let targetUser = message.guild.members.cache.get(message.author.id)
        let dados = await report?.find({discordId: targetUser.id}).exec()
        let guild

        if(dados == false) return message.reply("Usuário não recrutado! \nhttps://discord.gg/ubXuX3t7T4")
        if(dados[0].servidor == "1"){
            guild = "831483672065736704"
        } else if(dados[0].servidor == "2"){
            guild = "1060614825899728986"
        }

        if(message.guildId != guild) return message.reply("Servidor errado, mande mensagem para seu recrutador!")

        if(guild == "831483672065736704"){
            targetUser.setNickname(`VD | ${dados[0].nickname}`)
            setTimeout(function(){ targetUser.roles.add("832369903951675473") }, 500)
            setTimeout(function(){ targetUser.roles.remove("832425621707685938") }, 500)
            setTimeout(function(){ targetUser.roles.add("833102112186826843") }, 500)
            setTimeout(function(){ targetUser.roles.add("979947281325363250") }, 500)
            setTimeout(function(){ targetUser.roles.add("914696516990550047") }, 500)
            setTimeout(function(){ targetUser.roles.add("849727477265334312") }, 500)
            message.reply(`Usuário <@${targetUser.id}> cadastrado.`)
        } else if(guild == "1060614825899728986"){
            targetUser.setNickname(`VD | ${dados[0].nickname}`)
            setTimeout(function(){ targetUser.roles.add("1060614826025558040") }, 500)
            setTimeout(function(){ targetUser.roles.add("1060614826004578386") }, 500)
            setTimeout(function(){ targetUser.roles.add("1060614825983623203") }, 500)
            setTimeout(function(){ targetUser.roles.add("1060614825899728991") }, 500)
            message.reply(`Usuário <@${targetUser.id}> cadastrado.`)
        }




    }
}
