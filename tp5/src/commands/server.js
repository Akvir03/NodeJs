const { SlashCommandBuilder } = require('discord.js')
/**
 * Commande qui donne les informations serveur
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('sort le nom du serveur et son nombre de membres'),
    async execute(interaction) {
        await interaction.reply(`Nom du serveur: ${interaction.guild.name}\nNombre de membres: ${interaction.guild.memberCount}`)
    },
}

