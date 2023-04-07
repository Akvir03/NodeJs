const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const { logger } = require("../log");
/**
 * Commande qui retourne un json contenant l'utilisateur demandé
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('findone')
        .setDescription('Affiche les utilisateurs')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Le username a rechercher')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const lien = `http://localhost:3000/users/findone?username=` + interaction.options.getString('username');
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