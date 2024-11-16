const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const btn = require('../../buttons/modalButton.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('testing'),
    cooldown: 5,
    async execute(interaction) {
        await interaction.reply({ embeds: [helpEmbed], components: [btn.row] });
    },
};

const helpEmbed = new EmbedBuilder()
    .setColor('FFA500')
    .setTitle('Apply for Whitelist')
    .setDescription('Please click the button below to begin the application process.\n\nReply times vary between 24 and 72 hours.')
    .setThumbnail('http://severation.site.nfoservers.com/media/harvardlogo.png')
    .setFooter({ text: 'Whitmore College' })