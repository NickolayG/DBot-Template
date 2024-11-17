const { Events, Collection } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			// Cooldown Management
			if (command.cooldown) {
				const cooldowns = interaction.client.cooldowns;

				if (!cooldowns.has(command.data.name)) {
					cooldowns.set(command.data.name, new Collection());
				}

				const now = Date.now();
				const timestamps = cooldowns.get(command.data.name);
				const defaultCooldownDuration = 3;
				const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

				if (timestamps.has(interaction.user.id)) {
					const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

					if (now < expirationTime) {
						const expiredTimestamp = Math.round(expirationTime / 1_000);
						await interaction.reply({ content: `Please wait <t:${expiredTimestamp}:R> before using ${command.data.name}.`, ephemeral: true});
						return setTimeout(() => interaction.deleteReply(), 5000)
					}
				} else {				
					timestamps.set(interaction.user.id, now);
					setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
				}
			}

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
			// Cooldown Management
			const buttonCooldown = new Collection();

			if (buttonCooldown.has(interaction.user.id)) {
				await interaction.reply({ content: 'Please wait before using button again.', ephemeral: true });
				return;
			} else {
				buttonCooldown.set(interaction.user.id);
				setTimeout(() => buttonCooldown.delete(interaction.user.id), 5000);
			}


			// Get Button
			const button = interaction.client.buttons.get(interaction.component.data.custom_id);

			// Execute the button
			button.execute(interaction);
			// Log the execution
			console.log('Button executed: ' + button.data.name);
		} else if (interaction.isModalSubmit()) {
			// Get Modal
			const modal = interaction.client.modals.get(interaction.customId);

			// Execute the modal
			modal.execute(interaction);
			// Log the execution
			console.log('Modal executed ' + modal.data.name);
		}
	},
};