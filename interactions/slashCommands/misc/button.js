const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const btn = require('../../buttons/testButton.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('testing'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
        .setColor('FFFF02')
        .setTitle('Test')
        .setDescription('Testing')
        
        await interaction.reply({ embeds: [helpEmbed], components: [btn.row] });
    },
};