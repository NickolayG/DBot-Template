const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const button = new ButtonBuilder()
    // Button Style
    .setCustomId('whitelistDenyButton')
    .setLabel('Deny')
    .setStyle(ButtonStyle.Danger);

module.exports = {
    // Basic Information
    data: {
        name: 'whitelistDenyButton'
    },
    // Convert Builder to Component
    row: new ActionRowBuilder()
        .addComponents(button),
    // Add normal component in case of grouping
    component: button,
    // What the button does when clicked
    async execute(interaction) {
        await interaction.reply({ content: "You've denied the application!", ephemeral: true });
    }
}
