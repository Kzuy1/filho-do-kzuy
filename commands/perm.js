const Discord = require("discord.js")
const mongoose = require('mongoose');
const allyNames = require("../models/allyNames.js")

module.exports = {
    name: "perm",

    run: async(client, message, args) => {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        if(message.guildId != "833725119720325190") return;
        let dados = await allyNames?.find({guildName: "guildNames"}).exec()
        let guildInfos = dados[0].guildInfo
        for(let i = 0; i < guildInfos.length; i++){
            const supportGuild = client.guilds.cache.get(guildInfos[i].guildId)
            const member = supportGuild.members.cache.get(message.author.id)
            let hasPremium = member ? member.roles.cache.has(guildInfos[i].guildRole) : false
            if(hasPremium){
                let nickname = member.nickname
                message.member.roles.add(guildInfos[i].allyRoleId)
                await sleep(500);
                message.member.roles.add("833725119729762355")
                await sleep(500);
                message.member.setNickname(nickname)
                message.reply(`🇧🇷: Perm configurada\n🇺🇸: Perm configured\n🇪🇸: Perm configurada`)
                break
            } else {
                message.reply(`🇧🇷: Guild não encontrada!\n🇺🇸: Guild not found!\n🇪🇸: Guild no encontrada!`)
            }
        }        
    }
}

