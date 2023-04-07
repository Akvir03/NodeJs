const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios").default;
const { logger } = require("../log");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('insertinwatch')
        .setDescription('Permet d\'ajouter un film dans une watchlist')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('le nom du film')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('le nom de la watchlist')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('username')
                .setDescription('le nom de l\'utilisateur qui possède la watchlist')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('statu')
                .setDescription('le statut du film dans la watchlist')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const data = {
                Title: interaction.options.getString('title'),
                username: interaction.options.getString('username'),
                nom: interaction.options.getString('name'),
                statu: interaction.options.getString('statu')
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:3000/watchlist/insertfilminwatchlist', data, config);
            await interaction.reply({ content: 'insertion effectuée', ephemeral: true });
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Une erreur est survenue lors de l\'insertion :(', ephemeral: true });
        }
    },
};
