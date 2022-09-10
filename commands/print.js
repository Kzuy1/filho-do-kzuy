const Discord = require("discord.js")
const fs = require('fs')
const report = require("../models/reportModel.js")

module.exports = {
    name: "print",

    run: async(client, message, args) => {
      if(message.guildId != "831483672065736704") return
      if(!(message.author.id == "307683313982767104" || message.author.id == "443216944783425546")) return message.reply("Somente o Kzuy ou Chakzzz pode utilizar esse comando!");

      const canal = client.channels.cache.get("831483673215369218")
      const members= canal.members.map(x => x.id)
      let nickname = ""
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      let nameFile = `CTA_${year}-${month}-${day}.txt`
      

      for (i = 0; i < members.length; i++){
        let request = await report.find({discordId: members[i]}).exec()
        if (request != undefined){
          nickname = nickname + request[0].nickname
        }
      }

      fs.writeFile(nameFile, nickname, (err) => {
        if (err) throw err;
      });

      message.reply({files: [`./${nameFile}`]})
      setTimeout(function(){ fs.unlink(`./${nameFile}`,(err) => {
        if (err) throw err;
      }); }, 2000)
      

      

    }
}
