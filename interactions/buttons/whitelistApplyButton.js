const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const button = new ButtonBuilder()
    // Button Style
    .setCustomId('whitelistApplyButton')
    .setLabel('Ahoy')
    .setStyle(ButtonStyle.Success);

module.exports = {
    // Basic Information
    data: {
        name: 'applyButton'
    },
    // Convert Builder to Component
    row: new ActionRowBuilder()
        .addComponents(button),
    // Add normal component in case of grouping
    component: button,
    // What the button does when clicked
    async execute(interaction) {
        await interaction.showModal(modal);
    }
}
