const Discord = require("discord.js")
const mongoose = require('mongoose');
const report = require("../models/reportModel.js")

module.exports = {
  name: "remove",

  run: async (client, message, args) => {

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (message.guildId != "831483672065736704") return;
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      message.reply("Você não tem permissão!")
    } else {
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if (!user) return message.reply("Membro não especificado!")
      let roleC = await user._roles
      let roles = [
        '852646292424753213' /*Server Booster*/,
        '840093797839798322' /*CTT*/,
        '840105438455922729' /*Cinema*/,
        '979947281325363250' /*Follow*/,
        '914696516990550047' /*Eventos*/,
        '914696715771203584' /*Amigo Secreto 2021*/,
        '934440613032648724' /*BossPartyS14*/,
        '849727477265334312' /*Language*/,
        '833102112186826843' /*Roles*/
      ]

      const update = await report.findOneAndUpdate(
        { discordId: user.id },
        { atividade: 0 }
      )

      const supportGuild = client.guilds.cache.get('833725119720325190')
      const userBomb = supportGuild.members.cache.get(user.id)
      try { userBomb.kick("Expulso da Guilda") } catch (error) {}

      for(i = 0; i < roleC.length; i++){
        if (!roles.includes(roleC[i])) {
          user.roles.remove(roleC[i])
          console.log(i);
          await sleep(500);
        }
      }

      user.setNickname("")
      message.reply(`Cargos removidos de ${user}.`)
    }

  }
}