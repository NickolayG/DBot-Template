const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config({path: 'config/secret.env'});

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages
]})


// Initialize event handler
const { initializeCommands } = require('./structure/handlers/commandHandler.js')
initializeCommands(client);

// Initialize event handler
const { initializeEvents } = require('./structure/handlers/eventHandler.js')
initializeEvents(client);

const { intializeButtons } = require('./structure/handlers/buttonHandler.js');
intializeButtons(client);

const { intializeModals } = require('./structure/handlers/modalHandler.js');
intializeModals(client);

client.cooldowns = new Collection();
client.buttonCooldown = new Collection();

client.login(process.env.DISCORD_TOKEN);

module.exports = {
    client: client
}