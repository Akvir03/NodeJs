const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const { logger } = require("../log");
/**
 * Commande qui permet d'afficher tous les films
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('affichefilms')
        .setDescription('Affiche les films'),
    async execute(interaction) {
        try {
            const lien = `http://localhost:3000/registre/registre`;
            const response = await request(lien);
            const body = await response.body.json();
            const formatted = JSON.stringify(body, null, 2); // formater le JSON pour qu'il soit lisible

            await interaction.reply({ content: 'Voici les films :', files: [{ attachment: Buffer.from(formatted), name: 'users.json' }] });
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Erreur de récupération :(', ephemeral: true });
        }
    },
};