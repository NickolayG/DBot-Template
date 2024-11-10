const { Collection } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

function intializeButtons(client) {
    client.buttons = new Collection();
    const buttonsPath = path.join(__dirname, '../../interactions/buttons');
    const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

    for (const file of buttonFiles) {
        const buttonPath = path.join(buttonsPath, file);
        const button = require(buttonPath);

        if ('data' in button && 'execute' in button) {
            client.buttons.set(button.data.name, button);
        } else {
            console.warn(`[WARNING] The button at ${buttonPath} is missing a required "data" or "execute" property.`);
        }
    }
}

module.exports = { intializeButtons };