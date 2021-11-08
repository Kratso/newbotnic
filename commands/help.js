const fs = require("fs");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: "help",
  description: "List all available commands.",
  data: new SlashCommandBuilder().setName("help").setDescription("List of commands"),
  execute(interaction) {
    let str = "";
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      str += `Name: ${command.name}, Description: ${command.description} \n`;
    }

    return void interaction.reply({
      content: str,
      ephemeral: true,
    });
  },
};
