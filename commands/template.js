const Discord = require("discord.js")

module.exports = {
    name: "template",

    run: async(client, message, args) => {
      if(message.guildId != "831483672065736704") return;
      const exampleEmbed = new Discord.EmbedBuilder()
        .setColor('Random')
        .setTitle('Templates de Listas')
        .addFields(
            { name: '1 - Fame Farm X5', value: 'https://prnt.sc/i7Eh9UUqDIwA', inline: false },
            { name: '2 - Fame Farm X10', value: 'https://prnt.sc/cMoz9UnL_N_t', inline: false },
            { name: '3 - World Boss', value: 'https://prnt.sc/Awg1ibzqdbj9', inline: false },
        )

      let msg = await message.channel.send({ embeds: [exampleEmbed] })
    }
}
