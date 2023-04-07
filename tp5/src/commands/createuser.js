const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios").default;
const { logger } = require("../log");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('createuser')
        .setDescription('Permet de modifier les informations pour 1 utilisateur')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Le username du user a changer')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('age')
                .setDescription('son âge')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nom')
                .setDescription('son nom')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('prenom')
                .setDescription('son prénom')
                .setRequired(true)),
    async execute(interaction) {
        try {

            const options = {
                method: 'POST',
                url: 'http://localhost:3000/users/create',
                params: { username: `${interaction.options.getString('username')}`, age: `${interaction.options.getString('age')}`, nom: `${interaction.options.getString('nom')}`, prenom: `${interaction.options.getString('prenom')}` }
            };
            try {
                const response = await axios.request(options)
                console.log(response)
                await interaction.reply({ content: 'Utilisateur crée', ephemeral: true });

            } catch (e) {
                logger.log("error", `${e}`);
            }
        } catch (error) {
            logger.log("error", `${error}`);
            await interaction.reply({ content: 'Une erreur est survenue lors de la création :(', ephemeral: true });
        }
    },
};