const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "cadastrar",

    run: async(client, message, args) => {
        if(message.guildId != "831483672065736704") return;
        if(!message.member.permissions.has("MANAGE_ROLES")) {
            message.reply("Você não tem permissão!")
        } else {
            let user = message.mentions.members.first()  || message.guild.members.cache.get(args[0])
            let nickname = args[1]
            if(!user) return message.reply("Membro não especificado! k!cadastrar <@Usuario> <Nickname>")
            if(!nickname) return message.reply("Nickname não especificado! k!cadastrar <@Usuario> <Nickname>")
            let dados = await report?.find({discordId: user.id}).exec()
            if(dados == false) {
                const cadastro = await report.create({
                    nickname: nickname,
                    discordId: user.id,
                    atividade: 1,
                    report: ""
                })
                user.setNickname(`VD | ${nickname}`)
                user.roles.add("832369903951675473")
                user.roles.remove("832425621707685938")
                user.roles.add("833102112186826843")
                user.roles.add("840093797839798322")
                user.roles.add("979947281325363250")
                user.roles.add("914696516990550047")
                user.roles.add("849727477265334312")
                message.reply(`Usuário <@${user.id}> cadastrado.`)
            } else {
                const  update = await report.findOneAndUpdate(
                    {discordId: user.id},
                    {nickname: nickname,
                    atividade: 1}
                )
                user.setNickname(`VD | ${nickname}`)
                user.roles.add("832369903951675473")
                user.roles.remove("832425621707685938")
                user.roles.add("833102112186826843")
                user.roles.add("840093797839798322")
                user.roles.add("979947281325363250")
                user.roles.add("914696516990550047")
                user.roles.add("849727477265334312")
                message.reply(`Usuário <@${user.id}> na ativa novamente!`)
            }


        }




        
    }
}
