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
const API_KEY = process.env.API_KEY

client.on("ready", () => {
  console.log("Bot online")
})

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith("/")) return

  const carro = msg.content.replace("/", "").toLowerCase()

  try {
    const res = await axios.post(ROBLOX_URL, {
      carro: carro
    }, {
      headers: {
        authorization: API_KEY
      }
    })

    msg.reply(`🚗 **KEY GERADA**\nCarro: ${carro}\nKey: \`${res.data.key}\``)

  } catch (err) {
    msg.reply("Erro ao gerar key.")
  }
})

client.login(TOKEN)
