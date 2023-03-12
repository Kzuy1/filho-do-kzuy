const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
  name: "remove-amigo",

  run: async (client, message, args) => {
    if (!(message.guildId != "831483672065736704" || message.guildId != "1060614825899728986")) return
    if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
      message.reply("Você não tem permissão!")
    } else {
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if (!user) return message.reply("Membro não especificado!")

      const update = await report.findOneAndUpdate(
        { discordId: user.id },
        { atividade: 0 }
      )

      let discordBomb1, discordBomb2
      let userVoodoo, userAcademy, userBomb1, userBomb2
      try { discordBomb1 = await client.guilds.cache.get('833725119720325190') } catch (err) { }
      try { userBomb1 = await discordBomb1.members.fetch(user.id) } catch (err) { }
      try { discordBomb2 = await client.guilds.cache.get('941706531630633001') } catch (err) { }
      try { userBomb2 = await discordBomb2.members.fetch(user.id) } catch (err) { }

      try { userBomb1.kick("Expulso da Guilda") } catch (err) { }
      try { userBomb2.kick("Expulso da Guilda") } catch (err) { }

      let roleC = await user._roles
      let roles = [
        '852646292424753213' /*Server Booster*/,
        '840093797839798322' /*CTT*/,
        '979947281325363250' /*Follow*/,
        '914696516990550047' /*Eventos*/,
        '849727477265334312' /*Language*/,
        '833102112186826843' /*Roles*/
      ];

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }


      for (i = 0; i < roleC.length; i++) {
        if (!roles.includes(roleC[i])) {
          user.roles.remove(roleC[i])
          await sleep(500);
        }
      }

      user.setNickname("")
      user.roles.add("832425621707685938");
      message.reply(`Expurgo de ${user} quase terminando, por que recebeu tag de Amigo.`)
    }

  }
}