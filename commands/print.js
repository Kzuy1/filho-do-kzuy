const { PermissionFlagsBits } = require("discord.js");
const fs = require('fs')
const report = require("../models/reportModel.js")

module.exports = {
    name: "print",

    run: async(client, message, args) => {
      if(message.guildId != "831483672065736704") return

      if(!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
        return message.reply("Você não tem permissão!")
      }

      const canalIds = ["831483673215369218", "832386708413743124", "832386687094620200", "832386659370663977", "950945707844591626"]; 

      const members = [];

      for (const channelId of canalIds) {
        const canal = await client.channels.fetch(channelId);
        const channelMembers = canal.members.map((x) => x.id);
        members.push(...channelMembers);
        
      }
      
      const date = new Date()
      let year = date.getFullYear()
      let month = String(date.getMonth() + 1).padStart(2, '0')
      let day = String(date.getDate()).padStart(2, '0')

      let msg = await message.reply("Loading <a:loading:1018631245623738450>\n\n:white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:")
      setTimeout(function(){ msg.edit("Loading <a:loading:1018631245623738450>\n\n:green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:")}, 1500)
      setTimeout(function(){ msg.edit("Loading <a:loading:1018631245623738450>\n\n:green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square:")}, 2500)
      let nameFile = `CTA_${year}-${month}-${day}.txt`
      let nickname = `${nameFile}`

      for (i = 0; i < members.length; i++){
        let request = await report.find({discordId: members[i]}).exec()
        if (!(request == false)){
          nickname = `${nickname} \n'${request[0].nickname}'`
        } else{
          nickname = `${nickname} \n'${members[i]}'`
        }
      }

      fs.writeFile(nameFile, nickname, (err) => {
        if (err) throw err;
      });

      setTimeout(async function(){ await msg.edit({content: `Lista do Major CTA ${day}/${month}/${year} :white_check_mark:`, files: [`./${nameFile}`]})}, 3000)
      setTimeout(function(){ fs.unlink(`./${nameFile}`,(err) => {
        if (err) throw err;
      }); }, 5000)
      

      

    }
}