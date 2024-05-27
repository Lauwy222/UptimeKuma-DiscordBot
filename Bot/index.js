const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let monitorMessages = {
    Gaming: null,
    Discord: null,
    Web: null
};

client.once('ready', async () => {
    console.log('Bot is online!');
    
    const channel = await client.channels.fetch(config.channelID);
if (channel && channel.isTextBased()) {
    await clearChannel(channel);
} else {
    console.error(`Unable to find text channel with ID ${config.channelID}`);
}
    // Call the function to update messages immediately
    await updateMessages();
    // Set interval to update messages every 30 seconds
    setInterval(updateMessages, config.updatetime * 1000);
});

async function updateMessages() {
    try {
        const guild = await client.guilds.fetch(config.guildID);
        if (!guild) {
            console.error(`Unable to find guild with ID ${config.guildID}`);
            return;
        }

        const channel = await guild.channels.fetch(config.channelID);
        if (!channel || !channel.isTextBased()) {
            console.error(`Unable to find text channel with ID ${config.channelID}`);
            return;
        }

        const response = await axios.get('<YOUR_BACKEND_URL>');
        const monitors = response.data;

        const gamingMonitors = monitors.filter(monitor => [
           'Lobby', 'Skyblock', 'Survival', 'Creative', 'KitPvP', 'Factions', 'Prison', 'Skywars'
        ].includes(monitor.monitor_name));

        const discordMonitors = monitors.filter(monitor => [
            'Discord bot', 'Status bot'
        ].includes(monitor.monitor_name));

        const webMonitors = monitors.filter(monitor => [
            'web1', 'web2', 'web3'
        ].includes(monitor.monitor_name));

        await sendMonitorsMessage(channel, 'Gaming', gamingMonitors);
        await sendMonitorsMessage(channel, 'Discord', discordMonitors);
        await sendMonitorsMessage(channel, 'Web', webMonitors);

    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendMonitorsMessage(channel, category, monitors) {
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

    let embed = new EmbedBuilder()
        .setTitle(`${category} Monitor`)
        .setColor('#0099ff')
        .setDescription(description)
        .setFooter({ text: `Last updated: ${new Date().toLocaleString()}` })
        .setURL('<YOUR_UPTIMEKUMA_URL>');

    try {
        
        if (monitorMessages[category]) {
            const message = await channel.messages.fetch(monitorMessages[category]);
            if (message) {
                await message.edit({ embeds: [embed] });
                console.log(`${new Date().toLocaleString()} | Updated ${category} monitors message`);
            } else {
                const newMessage = await channel.send({ embeds: [embed] });
                monitorMessages[category] = newMessage.id;
                console.log(`${new Date().toLocaleString()} | Sent new ${category} monitors message`);
            }
        } else {
            const newMessage = await channel.send({ embeds: [embed] });
            monitorMessages[category] = newMessage.id;
            console.log(`${new Date().toLocaleString()} | Sent ${category} monitors message`);
        }
    } catch (error) {
        console.error(`Failed to send/update ${category} monitors message:`, error);
    }
}

async function clearChannel(channel) {
    try {
        const fetchedMessages = await channel.messages.fetch();
        await channel.bulkDelete(fetchedMessages);
        console.log('Cleared channel');
    } catch (error) {
        console.error('Error clearing channel:', error);
    }
}
client.login(config.token).catch(error => {
    console.error('Error logging in:', error);
});