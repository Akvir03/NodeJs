const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('sort du membre et sa date d\'arrivée sur le serveur'),
    async execute(interaction) {
        await interaction.reply(`Nom du membre: ${interaction.user.tag}\nDate d'arrivée: ${interaction.member.joinedAt}`)
    },
}

