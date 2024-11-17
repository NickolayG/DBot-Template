const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const button = new ButtonBuilder()
        // Button Style
        .setCustomId('testButton')
        .setLabel('Test Button')
        .setStyle(ButtonStyle.Success);

module.exports = {
    // Basic Information
    data: {
        name: 'testButton'
    },
    // Convert Builder to Component
    row: new ActionRowBuilder()
        .addComponents(button),
    // What the button does when clicked
    async execute(interaction) {
        // Edit embed
        console.log(interaction);
    }
}