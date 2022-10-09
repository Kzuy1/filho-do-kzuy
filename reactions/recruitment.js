const Discord = require("discord.js")

module.exports = {
    name: "recruitment",

    run: async(client,dados) => {
        const recruitmentServer = await client.guilds.fetch("1028456264344272917")

        if(dados.t === "CHANNEL_CREATE" && dados.d.parent_id === '832378019234447411'){
            recruitmentServer.channels.create(dados.d.name, {
                type: "text",
                permissionOverwrites: [
                   {
                     id: recruitmentServer.roles.everyone,
                     allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                     deny: ['SEND_MESSAGES']
                   }
                ],
              })
        } else if(dados.t === 'MESSAGE_CREATE'){
            let channelLook = client.channels.cache.get(dados.d.channel_id)
            if(channelLook.parentId  !== '832378019234447411') return

            let content = dados.d.content
            recruitmentServer.channels.cache.find(channel => channel.name === channelLook.name)
            .send(`\n**Nickname:**\n${dados.d.member.nick}\n**Mensagem:**\n\n${content}`)
        }

    }
}

