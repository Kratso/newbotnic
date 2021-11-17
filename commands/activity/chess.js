const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: "chess",
  description: "Creates a Chess Activity",
  data: new SlashCommandBuilder()
    .setName("chess")
    .setDescription("Creates a Chess Activity"),
  execute(interaction, client) {
    client.discordTogether
      .createTogetherCode(interaction.member.voice.channel.id, "chess")
      .then(async (invite) => {
        console.log(invite);
        let str = `Nerd out with this link! ${invite.code}`;
        return void interaction.reply({
          content: str,
          ephemeral: false,
        });
      });
  },
};
