const { SlashCommandBuilder } = require('discord.js');
const messages = require('../../../data/messages.json');

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
        const embed = replaceEmbed(messages.embeds.whitelistRequest, interaction);
        console.log(embed);
    }
};

function replaceEmbed(embed, interaction) {
    // Example context to dynamically populate placeholders
    const context = {
        user_id: interaction.user.id,
        user_displayname: interaction.user.displayName,
        user_avatar: interaction.user.avatarURL()
    };

    // Function to replace placeholders with context values
    function replacer(str) {
        return str.replace(/\$\{(.*?)\}/g, function(_, key) {
            return context[key] || '';
        });
    }

    // Function to recursively process objects
    function processObject(obj) {
        for (var key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = replacer(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                processObject(obj[key]); // Recursively process nested objects
            }
        }
    }

    // Clone the embed to avoid mutating the original object
    var clonedEmbed = JSON.parse(JSON.stringify(embed));
    processObject(clonedEmbed);
    return clonedEmbed;
}

