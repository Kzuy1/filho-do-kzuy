const Discord = require("discord.js")

module.exports = {
    name: "template",

    run: async(client, message, args) => {
      if(message.guildId != "831483672065736704") return;
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Templates de Listas')
        .addFields(
            { name: '1 - Fame Farm X5', value: 'k!cadastrar <@Usuario> <Nickname>', inline: false },
            { name: '2 - Fame Farm X10', value: 'k!fflista DD/MM/AAAA HH:MM', inline: false },
        )

      let msg = await message.channel.send({ embeds: [exampleEmbed] })
    }
}