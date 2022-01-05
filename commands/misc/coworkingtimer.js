const { SlashCommandBuilder } = require("@discordjs/builders");

const START_HOUR = 7 * 60 * 60; // 07:00
const END_HOUR = 18 * 60 * 60 + 30 * 60; // 18:30
const FRIDAY_END_HOUR = 16 * 60 * 60; // 16:00
const WEEKEND = [0, 6];

const WORKING_NAME = "Espacio de Coworking";
const NIGHT_NAME = "Dormitorio";
const WEEKEND_NAME = "Juegoteca";

module.exports = {
  name: "coworkingtimer",
  description: "Set the Coworking timer for a channel",
  options: [
    {
      name: "channel",
      type: 7, //CHANNEL TYPE
      description: "Channel that will act as the 'Coworking Channel'",
      required: true,
    },
  ],
  data: new SlashCommandBuilder()
    .setName("coworkingtimer")
    .setDescription("Set the Coworking timer for a channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel that will act as the 'Coworking Channel'")
        .setRequired(true)
    ),
  execute(interaction) {
    clearTimeout();

    const channel = interaction.options.get("channel").channel;
    const currentTime = new Date();
    const hour =
      currentTime.getHours() * 60 * 60 +
      currentTime.getMinutes() * 60 +
      currentTime.getSeconds();
    const day = currentTime.getDay();
    switch (day) {
      case 1:
      case 2:
      case 3:
      case 4:
        if (hour < END_HOUR && hour > START_HOUR) setWorkingDayName(channel);
        else setNonWorkingName(channel);
        break;
      case 5:
        if (hour < FRIDAY_END_HOUR && hour > START_HOUR)
          setWorkingDayName(channel);
        else setNonWorkingName(channel);
        break;
      case 0:
      case 6:
        setNonWorkingName(channel);
        break;
    }

    return void interaction.reply("interacted");
  },
};

const setWorkingDayName = (channel) => {
  const currentTime = new Date();
  const day = currentTime.getDay();
  const currentHour =
    currentTime.getHours() * 60 * 60 +
    currentTime.getMinutes() * 60 +
    currentTime.getSeconds();
  const timer =
    (day === 5 ? FRIDAY_END_HOUR - currentHour : END_HOUR - currentHour) * 1000; //Shift time calculation

  channel.setName(WORKING_NAME);

  setTimeout(() => {
    setNonWorkingName(channel);
  }, timer);
};

const setNonWorkingName = (channel) => {
  const currentTime = new Date();
  const day = currentTime.getDay();
  const currentHour =
    currentTime.getHours() * 60 * 60 +
    currentTime.getMinutes() * 60 +
    currentTime.getSeconds();
  const timer =
    (day === 5
      ? 24 * 60 * 60 -
        currentHour + // remaining day
        2 * 24 * 60 * 60 + // SATURDAY + FRIDAY
        START_HOUR //start of the first shift
      : 24 * 60 * 60 -
        currentHour + // remaining day
        START_HOUR) * //start of the first shift
    1000;

  if (day === 5 || WEEKEND.includes(day)) channel.setName(WEEKEND_NAME);
  else channel.setName(NIGHT_NAME);

  setTimeout(() => {
    setWorkingDayName(channel);
  }, timer);
};
