const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios").default;
const { logger } = require("../log");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('createwatch')
        .setDescription('Permet de créer une watchlist')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription('le nom que tu veux lui donner')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('username')
                .setDescription('le nom de l\'utilisateur')
                .setRequired(true)),
    async execute(interaction) {
        try {

            const options = {
                method: 'POST',
                url: 'http://localhost:3000/watchlist/createwatchlist',
                params: {
                    nom: `${interaction.options.getString('nom')}`, username: `${interaction.options.getString('username')}`
                }
            };
            try {
                const response = await axios.request(options)
                console.log(response)
                await interaction.reply({ content: 'watchlist créée', ephemeral: true });

            } catch (e) {
                logger.log("error", `${e}`);
            }
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Une erreur est survenue lors de la création :(', ephemeral: true });
        }
    },
};