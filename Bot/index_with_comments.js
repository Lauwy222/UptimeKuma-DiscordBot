// Import required classes from discord.js and axios for making HTTP requests
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const config = require('./config.json');

// Create a new Discord client instance with specified intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Object to store the IDs of the monitor messages
let monitorMessages = {
    Gaming: null,
    Discord: null,
    Web: null
};

// Event listener for when the bot is ready
client.once('ready', async () => {
    console.log('Bot is online!');

    // Fetch the channel using the channel ID from the config
    const channel = await client.channels.fetch(config.channelID);
    
    if (channel && channel.isTextBased()) {
        // Clear the channel if it's a text-based channel
        await clearChannel(channel);
    } else {
        console.error(`Unable to find text channel with ID ${config.channelID}`);
    }

    // Call the function to update messages immediately
    await updateMessages();
    // Set interval to update messages every configured seconds
    setInterval(updateMessages, config.updatetime * 1000);
});

// Function to update monitor messages
async function updateMessages() {
    try {
        // Fetch the guild using the guild ID from the config
        const guild = await client.guilds.fetch(config.guildID);
        if (!guild) {
            console.error(`Unable to find guild with ID ${config.guildID}`);
            return;
        }

        // Fetch the channel using the channel ID from the config
        const channel = await guild.channels.fetch(config.channelID);
        if (!channel || !channel.isTextBased()) {
            console.error(`Unable to find text channel with ID ${config.channelID}`);
            return;
        }

        // Make a GET request to the backend to fetch monitor data
        const response = await axios.get('<YOUR_BACKEND_URL>');
        const monitors = response.data;

        // Filter monitors into categories
        const gamingMonitors = monitors.filter(monitor => [
            'Lobby', 'Skyblock', 'Survival', 'Creative', 'KitPvP', 'Factions', 'Prison', 'Skywars'
        ].includes(monitor.monitor_name));

        const discordMonitors = monitors.filter(monitor => [
            'Discord bot', 'Status bot'
        ].includes(monitor.monitor_name));

        const webMonitors = monitors.filter(monitor => [
            'web1', 'web2', 'web3'
        ].includes(monitor.monitor_name));

        // Send or update monitor messages in the channel
        await sendMonitorsMessage(channel, 'Gaming', gamingMonitors);
        await sendMonitorsMessage(channel, 'Discord', discordMonitors);
        await sendMonitorsMessage(channel, 'Web', webMonitors);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to send or update a monitor message in the channel
async function sendMonitorsMessage(channel, category, monitors) {
    // Create the description for the embed message
    let description = monitors.map(monitor => {
        let statusEmoji = '';
        switch (monitor.status) {
            case 0:
                statusEmoji = '🔴'; // Offline
                break;
            case 1:
                statusEmoji = '🟢'; // Online
                break;
            case 2:
                statusEmoji = '🟡'; // Warning
                break;
            case 3:
                statusEmoji = '🔵'; // Maintenance
                break;
            default:
                statusEmoji = '❓'; // Unknown
        }
        return `${statusEmoji} | ${monitor.monitor_name}`;
    }).join('\n');

    // Create the embed message
    let embed = new EmbedBuilder()
        .setTitle(`${category} Monitor`)
        .setColor('#0099ff')
        .setDescription(description)
        .setFooter({ text: `Last updated: ${new Date().toLocaleString()}` })
        .setURL('<YOUR_UPTIMEKUMA_URL>');

    try {
        // Check if there is an existing message to update or send a new one
        if (monitorMessages[category]) {
            const message = await channel.messages.fetch(monitorMessages[category]);
            if (message) {
                // Update the existing message
                await message.edit({ embeds: [embed] });
                console.log(`${new Date().toLocaleString()} | Updated ${category} monitors message`);
            } else {
                // Send a new message if the existing one was not found
                const newMessage = await channel.send({ embeds: [embed] });
                monitorMessages[category] = newMessage.id;
                console.log(`${new Date().toLocaleString()} | Sent new ${category} monitors message`);
            }
        } else {
            // Send a new message if there is no existing message ID
            const newMessage = await channel.send({ embeds: [embed] });
            monitorMessages[category] = newMessage.id;
            console.log(`${new Date().toLocaleString()} | Sent ${category} monitors message`);
        }
    } catch (error) {
        console.error(`Failed to send/update ${category} monitors message:`, error);
    }
}

// Function to clear the messages in a channel
async function clearChannel(channel) {
    try {
        // Fetch all messages in the channel and bulk delete them
        const fetchedMessages = await channel.messages.fetch();
        await channel.bulkDelete(fetchedMessages);
        console.log('Cleared channel');
    } catch (error) {
        console.error('Error clearing channel:', error);
    }
}

// Log in to Discord with the bot token from the config
client.login(config.token).catch(error => {
    console.error('Error logging in:', error);
});
