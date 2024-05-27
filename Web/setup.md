# Uptime Kuma Metrics API

This project reads the values from the metrics published by the Uptime Kuma service and creates an open API with simple information such as monitor name, monitor type, monitor URL, monitor hostname, monitor port, and status. The status is defined by Uptime Kuma metrics as follows:
- `1 = UP`
- `0 = DOWN`
- `2 = PENDING`
- `3 = MAINTENANCE`

The following instructions will guide you through setting up and using this code to fetch and display monitor data from Uptime Kuma in JSON format.

## Prerequisites

- PHP installed on your server.
- Uptime Kuma service running and accessible.
- API key generated from the Uptime Kuma dashboard.

## Setup Instructions

1. **Retrieve Your Metrics URL and API Key**
   - Navigate to your Uptime Kuma dashboard.
   - Go to `Settings` -> `API Keys`.
   - Generate and copy the API key.
   - Identify your Uptime Kuma metrics URL (usually in the form of `<yourURL>/metrics`).

2. **Configure the PHP Script**
   - Copy the PHP script provided below.
   - Replace `<yourURL>/metrics` with your actual Uptime Kuma metrics URL. ([line 3](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L3))
   - Replace `***************` with your actual API key. ([line 6](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L6))

3. **That's it!** Now please start with the Discord Bot setup.


### Code Pieces Referenced by Lines

- **[Lines 3-5](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L3-L5)**: Define the URL and API key for the metrics endpoint.
- **[Lines 8-11](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L8-L11)**: Initialize a new cURL session and set cURL options.
- **[Lines 14-16](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L14-L16)**: Execute the cURL session and get the HTTP status code.
- **[Lines 19-21](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L19-L21)**: Close the cURL session and check if the request was successful.
- **[Lines 23-41](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L23-L41)**: Parse the response and extract relevant data.
- **[Lines 44-46](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L44-L46)**: Set the content type of the response to JSON and output the data.
- **[Lines 48-50](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L48-L50)**: Output an error message if the request was not successful.
