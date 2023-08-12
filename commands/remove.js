const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
  name: "remove",

  run: async (client, message, args) => {
    if(message.guildId != "1060614825899728986") return
    if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
      message.reply("Você não tem permissão!")
    } else {
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if (!user) return message.reply("Membro não especificado!")

      const update = await report.findOneAndUpdate(
        { discordId: user.id },
        { atividade: 0 }
      )
      
      let discordVoodoo, discordAcademy, discordBomb1, discordBomb2
      let userVoodoo, userAcademy, userBomb1, userBomb2
      try {discordVoodoo = await client.guilds.cache.get('831483672065736704')} catch (err) {}
      try {userVoodoo = await discordVoodoo.members.fetch(user.id)} catch (err) {}
      try {discordAcademy = await client.guilds.cache.get('1060614825899728986')} catch (err) {}
      try {userAcademy = await discordAcademy.members.fetch(user.id)} catch (err) {}
      try {discordBomb1 = await client.guilds.cache.get('833725119720325190')} catch (err) {}
      try {userBomb1 = await discordBomb1.members.fetch(user.id)} catch (err) {}
      try {discordBomb2 = await client.guilds.cache.get('941706531630633001')} catch (err) {}
      try {userBomb2 = await discordBomb2.members.fetch(user.id)} catch (err) {}
      
      try { userVoodoo.kick("Expulso da Guilda") } catch (err) {}
      try { userAcademy.kick("Expulso da Guilda") } catch (err) {}
      try { userBomb1.kick("Expulso da Guilda") } catch (err) {}
      try { userBomb2.kick("Expulso da Guilda") } catch (err) {}

      message.reply(`Expurgo de ${user} realizado com sucesso!.`)
    }

  }
}