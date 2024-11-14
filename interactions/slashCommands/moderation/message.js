const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { defaultEmbed } = require('../../../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('testing'),
    async execute(interaction) {
        await interaction.reply({ embeds: [helpEmbed], components: [btn.row] });
    },
};

// 
const message_01 = {
    name: 'Test Button Message',
    description: 'Test Button Message',
    embed: new EmbedBuilder()
        .setColor('FF0000')
        .setTitle('Test')
}