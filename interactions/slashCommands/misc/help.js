const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Information regarding the bot'),
    async execute(interaction) {
        let commandText = '';

        const helpEmbed = new EmbedBuilder()
            .setColor('2ffde9')
            .setTitle('Commands:')
            .setAuthor({ name: 'Help Information', iconURL: 'https://severation.net/media/bot-template/DBot-Template_logo_transparent.png' })

        interaction.client.commands.forEach(command => {
            // Format command name
            const commandString = command.data.name.toString()
            const commandFormatted = commandString.charAt(0).toUpperCase() + commandString.slice(1);

            // Add field to embed
            helpEmbed.addFields({ name: ':small_blue_diamond: ' + commandFormatted, value: command.data.description });
        });
        
        await interaction.reply({ embeds: [helpEmbed] });
    },
};