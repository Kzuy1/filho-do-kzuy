const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
    name: "role",

    run: async(client, message, args) => {
        function embed (){
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('**Escolha uma classe principal e secundário**')
            .setDescription(`**1 - Tank\n2 - Healer\n3 - Suporte\n4 - Ranged\n5 - Melee**`)
            .addFields(
                { name: 'Exemplo:', value: 'Se sua role PRINCIPAL for Tank e SECUNDÁRIA for Healer\n**k!role 1 2**', inline: false },
                { name: 'Exemplo:', value: 'Se você tiver só uma role principal. Como só Tank\n**k!role 1 1**', inline: false },
            )
            let msg = message.reply({ embeds: [exampleEmbed] })
            return

        }
        if(message.guildId != "831483672065736704") return;
        if((args[0] == undefined) || (args[1] == undefined)){embed()}
        if((args[0] > 5) || (args[0] < 1)) return embed()
        if((args[1] > 5) || (args[1] < 1)) return embed()

        let role = ["T","H","S","R","M"]
        let targetUser = message.author.id
        let dados = await report?.find({discordId: targetUser}).exec()

        if(dados == false) return message.reply(`Usuário não está cadastrado. Mande messagem para <@307683313982767104> para informar o erro.`)
        let nickname = dados[0].nickname
        let roles = []

        for(i = 0; i < 2; i++){
            if (args[i] == 1) {roles.push(role[0])}
            if (args[i] == 2) {roles.push(role[1])}
            if (args[i] == 3) {roles.push(role[2])}
            if (args[i] == 4) {roles.push(role[3])}
            if (args[i] == 5) {roles.push(role[4])}

        }
        message.member.setNickname(`VD | ${roles[0]} ${roles[1]} | ${nickname}`)











        
    }
}
