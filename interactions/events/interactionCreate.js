const { Events } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			// If no command exists
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			// Command interaction
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			};

		} else if (interaction.isButton()) {
			const button = interaction.client.buttons.get(interaction.component.data.custom_id);

			button.execute(interaction);
			console.log('Button executed: ' + button.data.name);
		}
	},
};