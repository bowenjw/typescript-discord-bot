import {
    GatewayIntentBits as Intents,
    Partials
} from 'discord.js';
import { Client } from './Classes/index.js';
import * as commands from './commands/index.js';
import * as events from './events/index.js';
import {
    buttons, modals, selectMenus
} from './interactions/index.js';

// Initialization (specify intents and partials)
const client = new Client({
    intents: [
        Intents.Guilds,
        Intents.GuildMessages,
        Intents.MessageContent,
        Intents.GuildMembers
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember
    ],
    receiveMessageComponents: true,
    receiveModals: true,
    receiveAutocomplete: true,
    replyOnError: true,
    // replyMessageOnError: 'message on comand error',
    splitCustomID: true,
    splitCustomIDOn: '_',
    useGuildCommands: false
});

// Load Events
for (const event of Object.values(events)) {
    client.events.add(event);
}

// Load commands 
for (const command of Object.values(commands)) {
    client.commands.add(command);
}

// Load buttons
for (const button of Object.values(buttons)) {
    client.interactions.addButton(button);
}

// Load modals
for (const modal of Object.values(modals)) {
    client.interactions.addModal(modal);
}

// Load selectMenus
for (const selectMenu of Object.values(selectMenus)) {
    client.interactions.addSelectMenu(selectMenu);
}

// Bot logins to Discord services
client.login(process.env.TOKEN)
    .then(() => {
    // Skip if no-deployment flag is set, else deploys command
        if (!process.argv.includes('--no-deployment')) {
            client.commands.register();
        }
    });