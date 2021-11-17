require("dotenv").config();
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const token = process.env["DISCORD_TOKEN"];
const { DiscordTogether } = require("discord-together");
const { createPlayer } = require("./player");
console.log(createPlayer)
// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
  ],
});

const MISC_COMMANDS = './commands/misc'
const ACTIVITY_COMMANDS = './commands/activity'
const PLAYER_COMMANDS = './commands/player'

client.discordTogether = new DiscordTogether(client);

const player = createPlayer(client);

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client, player));
  }
}

client.commands = new Collection();

const commands = new Map()

const miscFiles = fs
  .readdirSync(MISC_COMMANDS)
  .filter((file) => file.endsWith(".js"));

commands.set(MISC_COMMANDS, miscFiles)

const playerFiles = fs
  .readdirSync(PLAYER_COMMANDS)
  .filter((file) => file.endsWith(".js"));

commands.set(PLAYER_COMMANDS, playerFiles)

const activityFiles = fs
  .readdirSync(ACTIVITY_COMMANDS)
  .filter((file) => file.endsWith(".js"));

commands.set(ACTIVITY_COMMANDS, activityFiles)

Array.from(commands.entries()).forEach(cmds => {
  for (const file of cmds[1]) {
    const command = require(`${cmds[0]}/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
  }
})


// Login to Discord with your client's token
client.login(token);
