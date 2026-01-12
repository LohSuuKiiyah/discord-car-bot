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

const cars = ["gol","civic","corolla","nivus"]

client.on("ready", () => {
  console.log("Bot online")
})

function makeKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let k = ""
  for (let i=0;i<10;i++) k += chars[Math.floor(Math.random()*chars.length)]
  return k
}

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith("/")) return

  const [cmd, robloxId] = msg.content.split(" ")
  const car = cmd.replace("/","").toLowerCase()

  if (!cars.includes(car)) return

  if (!robloxId) {
    msg.reply("Use: /"+car+" <RobloxUserId>")
    return
  }

  const key = makeKey()

  await axios.post("https://memory-store.roblox.com/queues/DiscordKeys/entries", {
    body: JSON.stringify({
      userId: robloxId,
      car: car
    })
  })

  msg.reply(`🚗 Key gerada\nCarro: ${car}\nUserId: ${robloxId}`)
})

client.login(TOKEN)
