const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: "poker",
  description: "Creates a Poker Activity",
  data: new SlashCommandBuilder()
    .setName("poker")
    .setDescription("Creates a Poker Activity"),
  execute(interaction, client) {
    client.discordTogether
      .createTogetherCode(interaction.member.voice.channel.id, "poker")
      .then(async (invite) => {
        console.log(invite);
        let str = `Play some hands with this link! ${invite.code}`;
        return void interaction.reply({
          content: str,
          ephemeral: false,
        });
      });
  },
};
