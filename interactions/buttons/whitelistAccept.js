const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const button = new ButtonBuilder()
    // Button Style
    .setCustomId('applyButton')
    .setLabel('Ahoy')
    .setStyle(ButtonStyle.Success);

const modal = new ModalBuilder()
    .setCustomId('whitelistApply')
    .setTitle('Whitelist Application')

const questionName = new TextInputBuilder()
    .setCustomId('questionone')
    .setLabel('What is your name?')
    .setMinLength(4)
    .setMaxLength(30)
    .setStyle(TextInputStyle.Short)

const questionClass = new TextInputBuilder()
    .setCustomId('questionone')
    .setLabel('What is your class?')
    .setMinLength(4)
    .setMaxLength(30)
    .setStyle(TextInputStyle.Short)

const questionUsername = new TextInputBuilder()
    .setCustomId('questionone')
    .setLabel('What is your in-game name?')
    .setMinLength(4)
    .setMaxLength(30)
    .setStyle(TextInputStyle.Short)

const questionWishJoin = new TextInputBuilder()
    .setCustomId('questiontwo')
    .setLabel('Why do you wish to join?')
    .setMinLength(4)
    .setMaxLength(300)
    .setStyle(TextInputStyle.Paragraph)

const firstActionRow = new ActionRowBuilder().addComponents(questionName);
const secondActionRow = new ActionRowBuilder().addComponents(questionClass);
const thirdActionRow = new ActionRowBuilder().addComponents(questionUsername);
const fourthActionRow = new ActionRowBuilder().addComponents(questionWishJoin);
        
modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);


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
