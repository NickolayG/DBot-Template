const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

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
        name: 'testModal'
    },
    // The modal itself
    modal: modal,
    // What the modal does when sent
    async execute() {
        await interaction.reply("You've sent the application!")
    }
}