const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const btn = require('../../buttons/modalButton.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('testing'),
    async execute(interaction) {
        await interaction.reply({ embeds: [helpEmbed], components: [btn.row] });
    },
};

const helpEmbed = new EmbedBuilder()
    //.setColor('FFFF02')
    .setTitle('Apply for Whitelist')
    .setDescription('Please click the button below to begin the application process.')
    .setFooter({ text: 'Whitemore College' })