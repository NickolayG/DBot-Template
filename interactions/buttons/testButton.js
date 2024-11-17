const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

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
        await interaction.reply({ content: "You've pressed the button!", ephemeral: true });
        setTimeout(() => interaction.deleteReply(), 5000);
    }
}