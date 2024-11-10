const { Events } = require('discord.js');

const { sendMessageDM } = require('../../structure/modules/welcomeMessageDM');
const { logMemberJoinLeave } = require('../../structure/modules/memberJoinLeave');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
        // Send Welcome Message through DM to member
		sendMessageDM(member);

		// Send Log for Member Add
		logMemberJoinLeave(member, 'JOIN');
	},
};