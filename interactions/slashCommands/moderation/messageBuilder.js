const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { defaultEmbed } = require('../../../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('messageBuilder')
        .setDescription('testing'),
    async execute(interaction) {
        /* 2 Subcommands (Message & Embed)
           Universal field for component e.g button (optional)
            Ask for the following for message:
                - Message Content
                - Attachment
                - Reaction(s)
            Ask for the following for embed:
                - Title
                - Color
                - Description
                - Thumbnail
                - Footer
            */
    },
};