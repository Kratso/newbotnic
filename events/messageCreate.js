module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    if (
      message.content === "!deploy" &&
      message.author.id === client.application?.owner?.id
    ) {
      await message.guild.commands
        .set(client.commands)
        .then(() => {
          message.reply("Deployed!");
        })
        .catch((err) => {
          message.reply(
            err
          );
          console.error(err);
        });
    }
  },
};
