module.exports = {
  name: "messageCreate",
  async execute(message, client, player) {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    if (
      message.content === "!deploy" &&
      message.author.id === client.application?.owner?.id
    ) {
      console.log([...client.commands.values()].map(a=>a.description))
      await message.guild.commands
        .set([...client.commands.values()])
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
