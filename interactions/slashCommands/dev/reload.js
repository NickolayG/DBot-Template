const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { development } = require('../../../config/config.json');
const logger = require('../../../utils/log.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload a command (Restricted to Developer)')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
        async execute(interaction) {
            // Check if user is developer, if not, disallow them.
            if (!development.dev_clientId.includes(interaction.user.id)) {
                await interaction.reply({ content: 'You lack permission for this command!', ephemeral: true});
                return;
            }

            const commands = interaction.client.commands;

            commands.forEach((command) => {
                // Command Categories
                const dirPath = path.resolve(__dirname, '../');
                const categories = fs.readdirSync(dirPath);

                for (const category of categories) {
                    const potentialPath = path.resolve(dirPath, category, `./${command.data.name}.js`);
                    
                    if (fs.existsSync(potentialPath)) {
                        // Wipe cache for command
                        delete require.cache[require.resolve(potentialPath)];

                        // Refresh Command
                        try {
                            const newCommand = require(potentialPath);
                            interaction.client.commands.set(newCommand.data.name, newCommand);
                            logger.toConsole(`Reloaded command ${command.data.name} successfully.`, 'INFO')
                        } catch (error) {
                            logger.toConsole(`Could not refresh command: ${command.data.name}`, 'ERROR');
                            return interaction.reply(`Could not refresh command: ${command.data.name}!`);
                        }
                    }
                }
            });
            await interaction.reply({ content: 'Reload completed!', ephemeral: true });
            setTimeout(() => interaction.deleteReply(), 5000);
        }
}