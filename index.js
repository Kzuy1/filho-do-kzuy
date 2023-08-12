const { Client, GatewayIntentBits } = require('discord.js');
const { connect, default: mongoose } = require('mongoose');
const config = require("./config.json");
const report = require("./models/reportModel.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log("Estou Online!")
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
  if (guildRemove.guild.id != "1060614825899728986") return;
  let role = guildRemove._roles
  if (role.includes('1060614826025558040')) {
    const update = await report.findOneAndUpdate(
      { discordId: guildRemove.id },
      { atividade: 0 }
    )
    guildRemove.guild.channels.cache.get("1139767587102789734").send(`O Player <@${guildRemove.id}> ou **${guildRemove.nickname}** saiu do Servidor. Não está sendo considerado mais como membro da Guilda.`)
  }
})

process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 Unhandled Promise Rejection:\n\n` + reason, promise);
  client.channels.cache.get("1017933097653776484").send(`🚫 Unhandled Promise Rejection:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Uncaught Promise Exception:\n\n` + error, origin);
  client.channels.cache.get("1017933097653776484").send(`🚫 Uncaught Promise Exception:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Uncaught Promise Exception (Monitor):\n\n` + error, origin);
  client.channels.cache.get("1017933097653776484").send(`🚫 Uncaught Promise Exception (Monitor):\n\n` + error, origin)
});

async function connectToDatabase() {
  mongoose.set("strictQuery", false)
  const connection = await connect(config.mongo_url, {})
  console.log('Database conectada com sucesso!')

}
connectToDatabase()

client.login(config.token)
