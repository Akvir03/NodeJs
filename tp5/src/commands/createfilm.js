const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios").default;
const { logger } = require("../log");
/**
 * Commande qui permet de créer un film
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('createfilm')
        .setDescription('Permet de créer un film')
        .addStringOption(option =>
            option.setName('titre')
                .setDescription('Le titre')
                .setRequired(true)),
    async execute(interaction) {
        try {

            const options = {
                method: 'POST',
                url: 'http://localhost:3000/registre/insertfilm',
                params: { Title: `${interaction.options.getString('titre')}` }
            };
            try {
                const response = await axios.request(options)
                console.log(response)
                await interaction.reply({ content: 'Film crée', ephemeral: true });

            } catch (e) {
                logger.log("error", `${e}`);
            }
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Une erreur est survenue lors de la création :(', ephemeral: true });
        }
    },
};