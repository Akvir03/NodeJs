const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const { logger } = require("../log");
/**
 * Commande qui permet d'obtenir une image de chat random
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Affiche une image aléatoire de chat'),

  async execute(interaction) {
    try {
      const response = await request('https://api.thecatapi.com/v1/images/search'); //L'api https://aws.random.cat/meow ne fonctionnant pas, j'ai utilisé une autre API
      const [{ url }] = JSON.parse(await response.body.read()).map(cat => ({ url: cat.url }));

      await interaction.reply({ files: [url] });
    } catch (error) {
      logger.log("error", `${error}`);
      await interaction.reply({ content: 'Une erreur est survenue lors de la récupération de l\'image de chat :(', ephemeral: true });
    }
  },
};
