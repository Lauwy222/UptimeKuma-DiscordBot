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
- **[Lines 7-9](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L7-L9)**: Retrieve the API key from the UptimeKuma dashboard and assign it to the `$password` variable.
- **[Lines 11-13](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L11-L13)**: Initialize a new cURL session with the given URL.
- **[Lines 15-18](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L15-L18)**: Set cURL options for returning the transfer as a string, using basic HTTP authentication, and setting the username and password for the connection.
- **[Lines 20-22](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L20-L22)**: Execute the cURL session and store the response.
- **[Lines 24-26](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L24-L26)**: Get the HTTP status code of the response.
- **[Lines 28-30](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L28-L30)**: Close the cURL session.
- **[Lines 32-34](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L32-L34)**: Check if the request was successful by comparing the HTTP status code to 200.
- **[Lines 36-53](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L36-L53)**: If the request was successful, parse the response using a regular expression to extract relevant data, and construct an array of the parsed data.
- **[Lines 55-57](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L55-L57)**: Set the content type of the response to JSON and output the data in JSON format.
- **[Lines 59-61](https://github.com/Lauwy222/UptimeKuma-DiscordBot/blob/main/Web/back-end.php#L59-L61)**: Output an error message if the request was not successful, including the HTTP status code in the message.
