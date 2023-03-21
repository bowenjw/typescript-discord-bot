import { Events } from 'discord.js';
import ExtendedClient from '../classes/Client';
import { Event } from '../interfaces';

const event: Event = {
    name: Events.ClientReady,
    once: true,
    execute: async (client:ExtendedClient) => {
        // Skip if no-deployment flag is set, else deploys commands
        if (!process.argv.includes('--no-deployment')) await client.deploy();
        console.log(`\nReady! Logged in as ${client.user?.tag} (${client.user?.id})\n`);
    },
};

export default event;