const Discord = require("discord.js")

module.exports = {
  name: "help",

  run: async(client, message, args) => {
    const exampleEmbed = new Discord.EmbedBuilder()
      .setColor('Random')
      .setTitle('Help Menu')
      .addFields(
          { name: 'k!cadastrar', value: 'k!cadastrar <@Usuario> <1-2> <Nickname>', inline: false },
          { name: 'k!listawarn', value: 'k!listawarn <@Usuario>', inline: false },
          { name: 'k!perm', value: '-', inline: false },
          { name: 'k!print', value: '-', inline: false },
          { name: 'k!relatorio', value: '-', inline: false },
          { name: 'k!registro', value: '-', inline: false },
          { name: 'k!remove', value: 'k!remove <@Usuario>', inline: false },
          { name: 'k!role', value: 'k!role <role1> <role2>', inline: false },
          { name: 'k!warn', value: 'k!warn <@Usuario>', inline: false },
      )

    let msg = await message.channel.send({ embeds: [exampleEmbed] }).catch((error) => {message.reply("Eu não tenho permissão!")})
  }
}
