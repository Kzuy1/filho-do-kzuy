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
        if((args[0] == undefined) || (args[1] == undefined)) return embed()
        if((args[0] > 5) || (args[0] < 1)) return embed()
        if((args[1] > 5) || (args[1] < 1)) return embed()

        let role = ["T","H","S","R","M"]
        let role1 = ["Tank", "Healer", "Suporte", "Ranged", "Melee"]
        let targetUser = message.author.id
        let dados = await report?.find({discordId: targetUser}).exec()

        if(dados == false) return message.reply(`Usuário não está cadastrado. Mande messagem para <@307683313982767104> para informar o erro.`)
        let nickname = dados[0].nickname
        let roles = []
        let roles1 = []
        
        setTimeout(function(){if(message.member.roles.cache.has("833103531057610802")) {message.member.roles.remove("833103531057610802")}}, 500)
        setTimeout(function(){if(message.member.roles.cache.has("833103571926122526")) {message.member.roles.remove("833103571926122526")}}, 500)
        setTimeout(function(){if(message.member.roles.cache.has("833103600489594920")) {message.member.roles.remove("833103600489594920")}}, 500)
        setTimeout(function(){if(message.member.roles.cache.has("833103632765026314")) {message.member.roles.remove("833103632765026314")}}, 500)
        setTimeout(function(){if(message.member.roles.cache.has("833103662288601158")) {message.member.roles.remove("833103662288601158")}}, 500)
        
        for(i = 0; i < 2; i++){
            switch (args[i]){
                case "1" :
                    roles.push(role[0])
                    roles1.push(role1[0])
                    setTimeout(function(){ message.member.roles.add("833103531057610802") }, 500)
                    break
                case "2":
                    roles.push(role[1])
                    roles1.push(role1[1])
                    setTimeout(function(){ message.member.roles.add("833103571926122526") }, 500)
                    break
                case "3":
                    roles.push(role[2])
                    roles1.push(role1[2])
                    setTimeout(function(){ message.member.roles.add("833103600489594920") }, 500)
                    break
                case "4":
                    roles.push(role[3])
                    roles1.push(role1[3])
                    setTimeout(function(){ message.member.roles.add("833103632765026314") }, 500)
                    break
                case "5":
                    roles.push(role[4])
                    roles1.push(role1[4])
                    setTimeout(function(){ message.member.roles.add("833103662288601158") }, 500)
                    break
                default:
                    return message.reply("Erro")
                    
            }
        }
        message.member.setNickname(`VD | ${roles[0]} - ${roles[1]} | ${nickname}`)
        const  update = await report.findOneAndUpdate(
            {discordId: targetUser},
            {role: [roles1[0], roles1[1]]}
        )
        message.reply("Roles configuradas!!")
        //
    }
}
