const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const messages = require('../../../data/messages.json');
const logger = require('../../../utils/log.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Send a pre-defined message or embed')
        .addSubcommand(subcommand =>
            subcommand.setName('message')
                .setDescription('Send pre-defined message')
                .addStringOption(option =>
                    option.setName('item')
                        .setDescription('Pick the message to send!')
                        .setAutocomplete(true)
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand.setName('embed')
                .setDescription('Send pre-defined embed')
                .addStringOption(option =>
                    option.setName('item')
                        .setDescription('Pick the embed to send!')
                        .setAutocomplete(true)
                        .setRequired(true))
        ),
    async autocomplete(interaction) {
        // Picked Subcommand
        const subcommand = interaction.options.getSubcommand();
        // Get focused value of what user types
        const focusedValue = interaction.options.getFocused();
        // Global variable for finished choice content
        var filterStartWith = ['ERROR'];
        
        if (subcommand === 'message') {
            // Array of message choices
            const choices = Object.keys(messages.messages);
            // Filter by what user types and sort it
            filterStartWith = choices.filter(choice => choice.startsWith(focusedValue)).sort();
        } else if (subcommand === 'embed') {
            // Array of embed choices
            const choices = Object.keys(messages.embeds);
            // Filter by what user types and sort it
            filterStartWith = choices.filter(choice => choice.startsWith(focusedValue)).sort();
        }

        // Autocomplete Respond
        await interaction.respond(
            filterStartWith.map(choice => ({ name: choice, value: choice }))
        )
    },
    async execute(interaction) {
        // Get string option from command
        const subcommand = interaction.options.getSubcommand();
        const option = interaction.options.getString('item');

        if (subcommand === 'message') {
            console.log('message!')
        } else if (subcommand === 'embed') {
            // Get Embed
            const jsonEmbed = Object.keys(messages.embeds).find(name => name === option)
            ? messages.embeds[option]
            : null;
            
            // Reply with error message
            if (!jsonEmbed) {
                await interaction.reply({ content: `Could not load ${option} embed!`, ephemeral: true});
            }

            // Replace the embed with the updated one
            const newEmbed = replaceEmbed(jsonEmbed, interaction);

            // Send to embed creator
            createEmbed(newEmbed, interaction);
        }

        // Create the embed with json fields
        async function createEmbed(inputEmbed, interaction) {
            const outputEmbed = new EmbedBuilder()
                .setColor(inputEmbed.color || 'FF0000')
                .setTitle(inputEmbed.title || null)
                .setURL (inputEmbed.url || null)
                .setAuthor({ name: inputEmbed.author.name || null, iconURL: inputEmbed.author.iconURL || null, url: inputEmbed.author.url || null })
                .setDescription(inputEmbed.description || null)
                .setImage(inputEmbed.image || null)
                .setFooter({ text: inputEmbed.footer.text || null, iconURL: inputEmbed.footer.iconURL || null })
        
            // Add timestamp if true
            if (inputEmbed.timestamp === true) {
                outputEmbed.setTimestamp();
            }
            
            // Go through each field
            Object.keys(inputEmbed.fields).forEach((field) => {
                // Redefine the variable with correct field
                fieldKey = inputEmbed.fields[field];
                console.log(fieldKey)
                // Add a field to embed
                outputEmbed.addFields({ name: fieldKey.name || null, value: fieldKey.value || null }); 
            });


            // Component Management
            const componentPath = path.join(__dirname, '../../buttons');
            const componentArray = [];

            // Component Management - Go through each component
            Object.keys(inputEmbed.components).forEach((component) => {
                // If component doesn't exist, return
                if (!inputEmbed.components[component]) {
                    return;
                }

                // Update the component with the proper name
                component = inputEmbed.components[component];

                // Check if component exists
                if (fs.existsSync(`${componentPath}/${component}.js`)) {
                    // If it exists
                    const componentItem = require(`${componentPath}/${component}.js`);
                    // Puh the component to the array
                    componentArray.push(componentItem.component);
                } else {
                    logger.toConsole(`Cannot find component ${component}!`, 'ERROR');
                }
            })
            console.log(componentArray)
            // Add each one into an Action Row Builder
            const row = new ActionRowBuilder().addComponents(componentArray);

            await interaction.reply({ embeds: [outputEmbed], components: [row] });

            // Debugging
            //console.log(inputEmbed);
        }
        
        
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
            // Only replace if the key exists in context; otherwise, return the original placeholder
            return key in context ? context[key] : `\${${key}}`;
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
