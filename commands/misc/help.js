const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const MISC_COMMANDS = "commands/misc";
const ACTIVITY_COMMANDS = "commands/activity";
const PLAYER_COMMANDS = "commands/player";

const REQUIRE_MISC_COMMANDS= "./";
const REQUIRE_ACTIVITY_COMMANDS = "../activity";
const REQUIRE_PLAYER_COMMANDS = "../player";


module.exports = {
  name: "help",
  description: "List all available commands.",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of commands"),
  execute(interaction) {
    let str = "";
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Help for Jose Tomás")
      .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
      .setAuthor(
        "Jose Tomás",
        "https://i.imgur.com/VDml2Gi.jpg",
        "https://twitter.com/KratsoZerusa"
      )
      .setDescription("List of all Josetomasian Commands")
      .setTimestamp()
      .setFooter(
        "Powered by Kratso @ＫＲＡＴＳＯ#6969",
        "https://i.imgur.com/VDml2Gi.jpg"
      )
      .setThumbnail("https://i.imgur.com/VDml2Gi.jpg");

    const commands = new Map();

    const miscFiles = fs
      .readdirSync(MISC_COMMANDS)
      .filter((file) => file.endsWith(".js"));

    commands.set("Miscellanous Commands", [REQUIRE_MISC_COMMANDS, [...miscFiles]]);

    const playerFiles = fs
      .readdirSync(PLAYER_COMMANDS)
      .filter((file) => file.endsWith(".js"));

    commands.set("Music Player Commands", [REQUIRE_PLAYER_COMMANDS, [...playerFiles]]);

    const activityFiles = fs
      .readdirSync(ACTIVITY_COMMANDS)
      .filter((file) => file.endsWith(".js"));

    commands.set("Activity Commands", [REQUIRE_ACTIVITY_COMMANDS, [...activityFiles]]);

    Array.from(commands.entries()).forEach( cmd => {
      embed.addField(cmd[0], '\u200b', false);
      cmd[1][1].forEach( file => {
        const command = require(`./${cmd[1][0]}/${file}`);
        embed.addField(command.name, command.description, true);
      })
      embed.addField('\u200b', '\u200b', false);
    });

    return void interaction.reply({ embeds: [embed] });
  },
};
