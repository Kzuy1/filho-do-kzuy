const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "cadastrar",

    run: async(client, message, args) => {
        if(message.guildId != "1060678186490396816") return;
        if(!message.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
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
                    role: "",
                    report: ""
                })


            } else {
                const  update = await report.findOneAndUpdate(
                    {discordId: user.id},
                    {
                        nickname: nickname,
                        atividade: 1,
                    }
                )
            }

            const channel = client.channels.cache.get('1083896216108159056');
            const invite = await channel.createInvite({ maxUses: 1, maxAge: Math.floor(Math.random() * 86400) + 3600});

            message.reply(`Usuário <@${user.id}> cadastrado.\nBem-Vindo <@${user.id}>, para receber cargo entre no servidor e digite k!registro\n${invite}`)

        }  
    }
}
