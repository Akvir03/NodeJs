const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const { logger } = require("../log");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('find')
        .setDescription('Affiche les utilisateurs'),
    async execute(interaction) {
        try {
            const lien = `http://localhost:3000/users/users`;
            const response = await request(lien);
            const body = await response.body.json();
            const formatted = JSON.stringify(body, null, 2); // formater le JSON pour qu'il soit lisible

            await interaction.reply({ content: 'Voici les utilisateurs :', files: [{ attachment: Buffer.from(formatted), name: 'users.json' }] });
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Une erreur est survenue lors de la récupération des utilisateurs :(', ephemeral: true });
        }
    },
};