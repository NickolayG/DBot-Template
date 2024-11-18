const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const button = new ButtonBuilder()
    // Button Style
    .setCustomId('modalButton')
    .setLabel('Apply')
    .setStyle(ButtonStyle.Success);

const modal = new ModalBuilder()
    .setCustomId('testModal')
    .setTitle('Test Modal')

const questionone = new TextInputBuilder()
    .setCustomId('questionone')
    .setLabel('What is your username?')
    .setMinLength(4)
    .setMaxLength(30)
    .setStyle(TextInputStyle.Short)
        
const questiontwo = new TextInputBuilder()
    .setCustomId('questiontwo')
    .setLabel('Why do you wish to join?')
    .setMinLength(4)
    .setMaxLength(300)
    .setStyle(TextInputStyle.Paragraph)

const firstActionRow = new ActionRowBuilder().addComponents(questionone)
const secondActionRow = new ActionRowBuilder().addComponents(questiontwo)
        
modal.addComponents(firstActionRow, secondActionRow);


module.exports = {
    // Basic Information
    data: {
        name: 'modalButton'
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
