# UptimeKuma-DiscordBot

## Prerequisites

- **NodeJS**: [NodeJS](https://nodejs.org/en)
- **DiscordJS**: [DiscordJS](https://discord.js.org/)
- **axios**: [axios](https://www.npmjs.com/package/axios)

## Setup Instructions

1. Fill in the placeholders in the [`config.json`](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Bot/config.json) file.
   
    ```json
    {
        "token": "<token>",
        "guildID": "<guildID>",
        "channelID": "<channelID>",
        "clientID": "<clientID>",
        "updatetime": "<Update time in Seconds>"
    }
    ```

2. Configure the `index.js` file with the correct URL for your backend and uptime monitor ([line 48](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Bot/index.js#L48)):
   
    ```javascript
    const response = await axios.get('<YOUR_BACKEND_URL>');
    ```

3. Create and group dashboards:
   Enter `<groupname>`, this is the name of your group and can be chosen as what you want to.
   `<monitor_name>` can be found from the same url as `<YOUR_BACKEND_URL>`. You can see in the first row `monitor_name`. These are the values you would like to enter.
   
    ```javascript
    const <groupname>Monitors = monitors.filter(monitor => [
                '<monitor_name>'
            ].includes(monitor.monitor_name));
    ```

   example of one dashboard (line: [51-53](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Bot/index.js#L51-L53), [63](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Bot/index.js#L63))
   
    ```javascript
    const gamingMonitors = monitors.filter(monitor => [
                'Lobby', 'Skyblock', 'Survival', 'Creative', 'KitPvP', 'Factions', 'Prison', 'Skywars'
            ].includes(monitor.monitor_name));

    await sendMonitorsMessage(channel, 'Gaming', gamingMonitors);
    ```

   example of three dashboards ([Line 51-65](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Bot/index.js#L51-L65)):
   
    ```javascript
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
    ```

   Enter your Uptime Kuma Dashboard URL in `<YOUR_UPTIMEKUMA_URL>`([line 99](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Bot/index.js#L99)).
4. Adding a new group should be done in [line 13-17](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Bot/index.js#L13-L17)
5. Color embed
    ```javascript
    let embed = new EmbedBuilder()
            .setTitle(`${category} Monitor`)
            .setColor('#0099ff')
            .setDescription(description)
            .setFooter({ text: `Last updated: ${new Date().toLocaleString()}` })
            .setURL('<YOUR_UPTIMEKUMA_URL>');
    ```
    (PS. `.setColor('#0099ff')` can be set to whatever HEX color you prefer.)

## Code Pieces Referenced by Lines

- **[Lines 3-5](index.js#L3-L5)**: Import required modules.
- **[Lines 7-13](index.js#L7-L13)**: Initialize the Discord client with required intents.
- **[Lines 15-17](index.js#L15-L17)**: Initialize `monitorMessages` object to store monitor message IDs.
- **[Lines 19-32](index.js#L19-L32)**: Event listener for when the bot is ready, fetching the channel and clearing it.
- **[Lines 34-72](index.js#L34-L72)**: Function to update monitor messages, fetch guild and channel, and make HTTP requests to get monitor data.
- **[Lines 74-113](index.js#L74-L113)**: Function to send or update monitor messages in the channel based on category.
- **[Lines 115-124](index.js#L115-L124)**: Function to clear messages in a channel.
- **[Lines 126-128](index.js#L126-L128)**: Log in to Discord with the bot token from the config.
