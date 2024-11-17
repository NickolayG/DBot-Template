const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Send a pre-defined message or embed')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('Pick the message item to send!')
                .setAutocomplete(true)
        ),
    async autocomplete(interaction) {
        // Get focused value of what user types
        const focusedValue = interaction.options.getFocused();
        // Array of choices
        const choices = ['1', '3', '2', 'B', 'g', 'A'];
        // Filter by what user types and sort it
        const filterStartWith = choices.filter(choice => choice.startsWith(focusedValue)).sort();
        // Autocomplete Respond
        await interaction.respond(
            filterStartWith.map(choice => ({ name: choice, value: choice }))
        )
    },
    async execute(interaction) {
        // Get string option from command
        const option = interaction.options.getString('item');
        // Reply
        await interaction.reply(option);
    }
};