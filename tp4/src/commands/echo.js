const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Renvoie le paramètre entré')
        .addStringOption(option =>
			option
				.setName('msg')
				.setDescription('Message à renvoyer')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString("msg")
        await interaction.reply(input)
    },
}