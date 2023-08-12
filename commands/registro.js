const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "registro",

    run: async(client, message, args) => {
        if(message.guildId != "1060614825899728986") return
        let targetUser = message.guild.members.cache.get(message.author.id)
        let dados = await report?.find({discordId: targetUser.id}).exec()
    
        if (dados.length === 0 || dados[0].atividade === 0) {
            return message.reply("Usuário não recrutado!\nhttps://discord.gg/ubXuX3t7T4");
        }

        await targetUser.setNickname(`GN | ${dados[0].nickname}`);
        await targetUser.roles.add("1060614826025558040");
        await targetUser.roles.remove("1139759898029199361");

        message.reply(`Usuário <@${targetUser.id}> cadastrado.`);

    }
}
