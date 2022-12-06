const { Client, GatewayIntentBits } = require('discord.js');
const { connect, default: mongoose } = require('mongoose');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] })
const config = require("./config.json")
const fs = require('fs')
const eventosLista = require("./models/eventosLista.js")
const report = require("./models/reportModel.js")

client.on("ready", () => {
  console.log("Estou Online!")
})


client.on("raw", async dados => {
  if (dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
  if (dados.d.message_id === "1008456938129981491") {
    try {
      const commandReactions = require(`./reactions/autorole.js`)
      commandReactions.run(client, dados)
    } catch (err) {
      console.log(err)
    }

  }
  let consulta = await eventosLista?.find({ eventoId: dados.d.message_id }).exec()
  if (consulta != false) {
    try {
      const commandReactions = require(`./reactions/${consulta[0].evento}.js`)
      commandReactions.run(client, dados, consulta)
    } catch (err) {
      console.log(err)
    }
  }

})

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  try {
    const commandFile = require(`./commands/${comando}.js`)
    commandFile.run(client, message, args)
  } catch (err) {
    message.reply(`Não existe nenhum comando k!${comando}\nDigite k!help para ver os comandos!`)
  }
});

client.on("guildMemberRemove", async guildRemove => {
  if (guildRemove.guild.id != "831483672065736704") return;
  const roleIDs = ['832369903951675473', '925546014193090600'];
  let role = guildRemove._roles
  if (role.includes('832369903951675473') || role.includes('925546014193090600')) {
    const update = await report.findOneAndUpdate(
      { discordId: guildRemove.id },
      { atividade: 0 }
    )
    guildRemove.guild.channels.cache.get("1002755996902506586").send(`O Player <@${guildRemove.id}> ou **${guildRemove.nickname}** saiu do Servidor. Não está sendo considerado mais como membro da Guilda.`)
  }
})

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  let teste1 = oldMember._roles.includes("965732206578393138")
  let teste2 = newMember._roles.includes("965732206578393138")
  if (teste1 && !teste2) {
    oldMember.guild.channels.cache.get("1001970079040290856").send(`O Player <@${oldMember.id}> ou **${oldMember.nickname}** perdeu tag Pass.`)
  }
  if (!teste1 && teste2) {
    oldMember.guild.channels.cache.get("1001970079040290856").send(`O Player <@${oldMember.id}> ou **${oldMember.nickname}** recebeu tag Pass.`)
  }
})

// process.on('multipleResolves', (type, reason, promise) => {
//   client.channels.cache.get("1017933097653776484").send(`🚫 Erro Detectado\n\n` + type, promise, reason)
// });
// process.on('unhandRejection', (reason, promise) => {
//   client.channels.cache.get("1017933097653776484").send(`🚫 Erro Detectado:\n\n` + reason, promise)
// });
// process.on('uncaughtException', (error, origin) => {
//   client.channels.cache.get("1017933097653776484").send(`🚫 Erro Detectado:\n\n` + error, origin)
// });
// process.on('uncaughtExceptionMonitor', (error, origin) => {
//   client.channels.cache.get("1017933097653776484").send(`🚫 Erro Detectado:\n\n` + error, origin)
// });

async function connectToDatabase() {
  const connection = await connect(config.mongo_url, {})
  console.log('Database conectada com sucesso!')

}
connectToDatabase()

client.login(config.token)
