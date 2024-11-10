const { EmbedBuilder } = require('discord.js');
const Logger = require('../../utils/log.js');
const { welcomeMessageDM, modules } = require('../../config/config.json');

async function sendMessageDM(member) {
	if (modules.welcomeMessageDMModule === false) {
		return;
	}

	try {
		if (welcomeMessageDM.message.enabled === true && welcomeMessageDM.embed.enabled === true) {
			await member.send({ content: `${welcomeMessageDM.message.content}`, embeds: [welcomeEmbed] });
		} else if (welcomeMessageDM.message.enabled === true) {
			await member.send({ content: `${welcomeMessageDM?.message?.content}` })
		} else if (welcomeMessageDM.embed.enabled === true) {
			await member.send({ embeds: [welcomeEmbed] })
		} else {
			return;
		}
	} catch (error) {
		Logger.toConsole('Could not send welcome message DM: ' + error, 'ERROR');
	}

}

const welcomeEmbed = new EmbedBuilder()
	.setColor(welcomeMessageDM?.embed?.color || 'FFFF00')
	
	if (welcomeMessageDM?.embed?.title) {
		welcomeEmbed.setTitle(welcomeMessageDM?.embed?.title);
	}
	if (welcomeMessageDM?.embed?.description) {
		welcomeEmbed.setDescription(welcomeMessageDM?.embed?.description);
	}
	if (welcomeMessageDM?.embed?.thumbnail) {
		welcomeEmbed.setThumbnail(welcomeMessageDM?.embed?.thumbnail);
	}

module.exports = { sendMessageDM };