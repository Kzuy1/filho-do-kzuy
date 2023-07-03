const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "registro",

    run: async(client, message, args) => {
        if(message.guildId != "831483672065736704") return
        let targetUser = message.guild.members.cache.get(message.author.id)
        let dados = await report?.find({discordId: targetUser.id}).exec()
    
        if(dados == false) return message.reply("Usuário não recrutado! \nhttps://discord.gg/ubXuX3t7T4")

        targetUser.setNickname(`VD | ${dados[0].nickname}`)
        setTimeout(function(){ targetUser.roles.add("832369903951675473") }, 500)
        setTimeout(function(){ targetUser.roles.remove("832425621707685938") }, 500)
        setTimeout(function(){ targetUser.roles.add("833102112186826843") }, 500)
        setTimeout(function(){ targetUser.roles.add("979947281325363250") }, 500)
        setTimeout(function(){ targetUser.roles.add("914696516990550047") }, 500)
        setTimeout(function(){ targetUser.roles.add("849727477265334312") }, 500)
        message.reply(`Usuário <@${targetUser.id}> cadastrado.`)

    }
}
