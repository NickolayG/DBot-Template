const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { development } = require('../../../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload a command (Restricted to Developer)')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addStringOption(option =>
            option.setName('command')
            .setDescription('Name of command to reload.')
            .setRequired(true)),
        async execute(interaction) {
            // Check if user is developer, if not, disallow them.
            if (!development.dev_clientId.includes(interaction.user.id)) {
                await interaction.reply({ content: 'You lack permission for this command!', ephemeral: true});
                return;
            }

            // Reload command
            const commandName = interaction.options.getString('command', true).toLowerCase();
            const command = interaction.client.commands.get(commandName);

            // Check if command exists
            if (!command) {
                await interaction.reply({ content: `Command '${commandName} does not exist!`, ephemeral: true});
                return;
            }

            // Wipe cache for the specific command
            delete require.cache[require.resolve(`./${command.data.name}.js`)];

            // Refresh the command
            try {
                const newCommand = require(`./${command.data.name}.js`);
                interaction.client.commands.set(newCommand.data.name, newCommand);
                await interaction.reply({ content: `Reloaded command '${newCommand.data.name}'!`, ephemeral: true});
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: `Error while reload command: '${command.data.name}'\nError: ${error.message}`, ephemeral: true});
            }
        }
}