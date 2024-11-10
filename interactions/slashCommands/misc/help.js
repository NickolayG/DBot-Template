const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Information regarding the bot'),
    async execute(interaction) {
        // WiP Message
        await interaction.reply({ content: 'Work In Progress', ephemeral: true });

        //
    },
};

const helpEmbed = new EmbedBuilder()
    .setColor('FFFF00')
    .setTitle('Help Information')
    .setDescription('Commands:')