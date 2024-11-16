const { Collection } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

function intializeModals(client) {
    client.modals = new Collection();
    const modalsPath = path.join(__dirname, '../../interactions/modals');
    const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

    for (const file of modalFiles) {
        const modalPath = path.join(modalsPath, file);
        const modal = require(modalPath);

        if ('data' in modal && 'modal' in modal && 'execute' in modal) {
            client.modals.set(modal.data.name, modal);
        } else {
            console.warn(`[WARNING] The modal at ${modalPath} is missing a required "data" or "modal" or "execute" property.`);
        }
    }
}

module.exports = { intializeModals };