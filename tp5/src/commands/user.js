const { SlashCommandBuilder } = require('discord.js')
/**
 * Commande qui donne le nom du membre et la date d'arrivée sur le serveur
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('sort le nom du membre et sa date d\'arrivée sur le serveur'),
    async execute(interaction) {
        await interaction.reply(`Nom du membre: ${interaction.user.tag}\nDate d'arrivée: ${interaction.member.joinedAt}`)
    },
}

