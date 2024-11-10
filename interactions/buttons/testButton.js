const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const button = new ButtonBuilder()
        // Button Style
        .setCustomId('testButton')
        .setLabel('Test Button')
        .setStyle(ButtonStyle.Success);

module.exports = {
    data: {
        // Basic Information
        name: 'testButton'
    },
    row: new ActionRowBuilder()
        .addComponents(button),
    async execute (interaction) {
        // What the button does when clicked
        interaction.message.delete();
    }
}
