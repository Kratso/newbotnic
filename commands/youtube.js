const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: "youtube",
  description: "Creates a Youtube Together Activity",
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Creates a Watch Together(Youtube player) Activity!")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The song to play")
        .setRequired(true)
    ),
  execute(interaction, client) {
    client.discordTogether
      .createTogetherCode(interaction.member.voice.channel.id, "youtube")
      .then(async (invite) => {
        console.log(invite);
        let str = `View Youtube with this link! ${invite.code}`;
        return void interaction.reply({
          content: str,
          ephemeral: false,
        });
      });
  },
};
