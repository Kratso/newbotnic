const { GuildMember } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: "pause",
  description: "Pause current song!",
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the player!"),
  async execute(interaction, _client, player) {
    if (
      !(interaction.member instanceof GuildMember) ||
      !interaction.member.voice.channel
    ) {
      return void interaction.reply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: "You are not in my voice channel!",
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: "❌ | No music is being played!",
      });
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? "⏸ | Paused!" : "❌ | Something went wrong!",
    });
  },
};
