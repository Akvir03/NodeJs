const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const { logger } = require("../log");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('urban')
    .setDescription('Recherche un terme sur Urban Dictionary.')
    .addStringOption(option =>
      option.setName('terme')
        .setDescription('Le terme à rechercher sur Urban Dictionary.')
        .setRequired(true)),
  async execute(interaction) {
    const terme = interaction.options.getString('terme');
    const url = `https://api.urbandictionary.com/v0/define?term=${terme}`;

    try {
      const result = await request(url);
      const data = await result.body.json();

      if (data.result_type === 'no_results') {
        await interaction.reply(`Aucun résultat trouvé pour "${terme}".`);
      } else {
        const [definition] = data.list;
        const response = `**${terme}** : ${definition.definition}`;
        await interaction.reply(response);
      }
    } catch (error) {
      logger.log("error", `${error}`);
      await interaction.reply('Une erreur est survenue lors de la recherche du terme sur Urban Dictionary.');
    }
  },
};