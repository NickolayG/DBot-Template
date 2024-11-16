const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const modal = new ModalBuilder()
    .setCustomId('testModal')
    .setTitle('Test Modal')

const questionone = new TextInputBuilder()
    .setCustomId('questionone')
    .setLabel('What is your username?')
    .setPlaceholder('Username')
    .setMinLength(3)
    .setMaxLength(30)
    .setStyle(TextInputStyle.Short)
        
const questiontwo = new TextInputBuilder()
    .setCustomId('questiontwo')
    .setLabel('Why do you wish to join?')
    .setPlaceholder('Reason')
    .setMinLength(10)
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
    async execute(interaction) {
        // Send confirmation reply
        await interaction.reply({ content: 'Application successfully sent in, please allow up to 48 hours for a reply.', ephemeral: true});
        
        // Delete Reply after 5 seconds
		setTimeout(() => {
			interaction.deleteReply();
		}, 10000);

        // Fields
        const fieldOne = interaction.fields.fields.get('questionone').value;
        const fieldTwo = interaction.fields.fields.get('questiontwo').value;

        // Logging
        console.log(`Field 1: ${fieldOne}\nField 2: ${fieldTwo}`);
    }
}