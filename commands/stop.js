const { GuildMember } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: "stop",
  description: "Stop all songs in the queue!",
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the Player completely"),
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
    queue.destroy();
    return void interaction.followUp({ content: "🛑 | Stopped the player!" });
  },
};
