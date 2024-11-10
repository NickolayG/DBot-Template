const { EmbedBuilder } = require('discord.js');
const { modules, logging } = require('../../config/config.json');

async function logMemberJoinLeave(member, joinType) {
    if (!modules.logging && !logging.memberJoinLeave) {
        return;
    }

    const joinEmbed = new EmbedBuilder()
        .setColor('FF0000')
        .setTitle(`Member Join: ${member.displayName}`)
        .setDescription(`User ID: ${member.user.id}`)

    const leftEmbed = new EmbedBuilder()
        .setColor('FF0000')
        .setTitle(`Member Left: ${member.displayName}`)
        .setDescription(`User ID: ${member.user.id}`)

    const guildChannel = member.guild.channels.cache.get(logging.memberJoinLeave.channelId);

    if (joinType === 'JOIN') {
        await guildChannel.send({ embeds: [joinEmbed] });
    }
    if (joinType === 'LEAVE') {
        await guildChannel.send({ embeds: [leftEmbed] });
    }
}

module.exports = { logMemberJoinLeave };