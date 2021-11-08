const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "amogus",
  description: "amogus",
  data: new SlashCommandBuilder().setName("amogus").setDescription("amogus"),
  execute(interaction, client) {
    client.discordTogether
      .createTogetherCode(interaction.member.voice.channel.id, "betrayal")
      .then(async (invite) => {
        console.log(invite);
        let str = `amogus ${invite.code}`;
        return void interaction.reply({
          content: str,
          ephemeral: false,
        });
      });
  },
};
