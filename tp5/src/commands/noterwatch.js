const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios").default;
const { logger } = require("../log");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('notefilmwatch')
        .setDescription('Permet de noter un film dans la watchlist')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription('le nom de la watchlist')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('le titre du film')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('note')
                .setDescription('la note pour le film')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const data = {
                nom: interaction.options.getString('nom'),
                item: interaction.options.getString('title'),
                note: interaction.options.getString('note')
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:3000/watchlist/notewatch', data, config);
            await interaction.reply({ content: 'note ajoutée', ephemeral: true });
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Erreur dans l\'ajout de la note :(', ephemeral: true });
        }
    },
};
