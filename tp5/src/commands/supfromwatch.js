const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios").default;
const { logger } = require("../log");
/**
 * Commande qui permet de supprimer une watchlist
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('supfromwatch')
        .setDescription('Permet de retirer un film d\'une watchlist')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('le nom du film')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('le nom de la watchlist')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const data = {
                Title: interaction.options.getString('title'),
                nom: interaction.options.getString('name')
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:3000/watchlist/suppfromwatch', data, config);
            await interaction.reply({ content: 'suppression effectuée', ephemeral: true });
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression :(', ephemeral: true });
        }
    },
};
