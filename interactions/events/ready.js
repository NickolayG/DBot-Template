const { Events } = require('discord.js');
const Logger = require('../../utils/log.js');

const { saveGuildNames } = require('../../utils/saveGuildNames.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        // Get guilds from client
        const guilds = client.guilds.cache;

        // Run function to save guild names
        saveGuildNames(client);


        // Make variable to keep track of total member count
        var guildMembersCount = 0;
        var guildBotsCount = 0;
        // Run through each guild to get each member count respectively
        for (const guild of guilds) {
            const members = await guild[1].members.fetch();

            const membersNoBotSize = members.filter(m => !m.user.bot).size;
            const botsSize = members.filter(m => m.user.bot).size;

            guildMembersCount += membersNoBotSize;
            guildBotsCount += botsSize;
        }

        // Use logging system to log an entry for client login
        Logger.toConsole(`Client logged in as "${client.user.tag}"
            Total Servers: ${client.guilds.cache.size}
            Total Members: ${guildMembersCount}
            Total Bots: ${guildBotsCount}`);
    }
}