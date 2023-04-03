const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici');

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
      console.error(error);
      await interaction.reply({ content: 'Une erreur est survenue lors de la récupération de l\'image de chat :(', ephemeral: true });
    }
  },
};
