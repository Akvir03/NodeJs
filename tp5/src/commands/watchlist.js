const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const { logger } = require("../log");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('watchlist')
        .setDescription('Affiche la watchlist demandée')
        .addStringOption(option => option.setName('nom')
            .setDescription('Le nom de la personne dont on veut voir la watchlist')
            .setRequired(true)),
    async execute(interaction) {
        try {
            const nom = interaction.options.getString('nom');
            const lien = `http://localhost:3000/watchlist/watchlist?nom=${nom}`;
            const response = await request(lien);
            const body = await response.body.json();
            const formatted = JSON.stringify(body, null, 2); // formater le JSON pour qu'il soit lisible

            await interaction.reply({ content: 'Voici la watchlist :', files: [{ attachment: Buffer.from(formatted), name: 'watchlist.json' }] });
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Une erreur est survenue lors de la récupération de la watchlist :(', ephemeral: true });
        }
    },
};