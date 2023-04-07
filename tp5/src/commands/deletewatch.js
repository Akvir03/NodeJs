const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios").default;
const { logger } = require("../log");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletewatch')
        .setDescription('Permet de supprimer une watchlist')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription('le nom de la watchlist')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const data = {
                nom: interaction.options.getString('nom')
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:3000/watchlist/suppwatch', data, config);
            console.log(response)
            await interaction.reply({ content: 'watchlist supprimée', ephemeral: true });
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Erreur de suppression :(', ephemeral: true });
        }
    },
};
