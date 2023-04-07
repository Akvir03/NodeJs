const { Events } = require('discord.js');
/**
 * Fonction qui affiche dans le terminal que le BOT est bien connecté en tant que : 
 */
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};