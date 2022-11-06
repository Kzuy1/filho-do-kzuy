const Discord = require("discord.js")
const mongoose = require('mongoose');
const allyNames = require("../models/allyNames.js")

module.exports = {
    name: "perm",

    run: async(client, message, args) => {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        let dados
        let roleAllyId
        switch (message.guildId){
            case "833725119720325190":
                dados = await allyNames?.find({guildName: "guildNames"}).exec()
                roleAllyId = "833725119729762355"

            break;

            case "941706531630633001":
                dados = await allyNames?.find({guildName: "guildNames2"}).exec()
                roleAllyId = "941706531672567853"
            break;

            default:
                return

        }
        
        let guildInfos = dados[0].guildInfo
        for(let i = 0; i < guildInfos.length; i++){
            const supportGuild = client.guilds.cache.get(guildInfos[i].guildId)
            const member = supportGuild.members.cache.get(message.author.id)
            let hasPremium = member ? member.roles.cache.has(guildInfos[i].guildRole) : false
            if(hasPremium){
                let nickname = member.nickname
                message.member.roles.add(guildInfos[i].allyRoleId)
                await sleep(500);
                message.member.roles.add(roleAllyId)
                await sleep(500);
                message.member.setNickname(nickname)
                message.reply(`🇧🇷: Perm configurada\n🇺🇸: Perm configured\n🇪🇸: Perm configurada`)
                return
            }
        }   
        message.reply(`🇧🇷: Guild não encontrada!\n🇺🇸: Guild not found!\n🇪🇸: Guild no encontrada!`)    
    }
}

