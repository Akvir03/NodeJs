const { SlashCommandBuilder } = require('discord.js')
/**
 * Commande qui répond pong si l'utilisateur l'utilise
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Réponse : Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!')
        await interaction.followUp('Pong again!')
    },
}