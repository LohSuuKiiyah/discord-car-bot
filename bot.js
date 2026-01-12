const { Client, GatewayIntentBits } = require("discord.js")
const axios = require("axios")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

const TOKEN = process.env.TOKEN
const ROBLOX_URL = process.env.ROBLOX_URL

client.on("ready", () => {
  console.log("Bot online")
})

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith("/")) return

  const [cmd, id] = msg.content.split(" ")
  const car = cmd.replace("/","")

  if (!id) {
    msg.reply("Use: /carro UserId")
    return
  }

  await axios.post(ROBLOX_URL, {
    topic: "GerarKey",
    data: {
      userId: id,
      car: car
    }
  })

  msg.reply(`Key registrada: ${car} para ${id}`)
})

client.login(TOKEN)
