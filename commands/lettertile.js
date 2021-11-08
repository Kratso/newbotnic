const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: "lettertile",
  description: "Creates a Letter Tile Activity",
  data: new SlashCommandBuilder()
    .setName("lettertile")
    .setDescription("Creates a LetterTile Activity"),
  execute(interaction, client) {
    client.discordTogether
      .createTogetherCode(interaction.member.voice.channel.id, "lettertile")
      .then(async (invite) => {
        console.log(invite);
        let str = `Tile Letters with this link! ${invite.code}`;
        return void interaction.reply({
          content: str,
          ephemeral: false,
        });
      });
  },
};
