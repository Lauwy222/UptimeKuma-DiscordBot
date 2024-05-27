<?php
// Define the URL and API key for the metrics endpoint
$url = '<yourURL>/metrics'; //your URL
$username = ''; //leave empty
// Retrieve an API key from the UptimeKuma dashboard here <yourURL>/settings/api-keys
$password = '***************'; //your API key


// Initialize a new cURL session
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the transfer as a string
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC); // Use basic HTTP authentication
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password"); // Set username and password for the connection

// Execute the cURL session
$response = curl_exec($ch);

// Get the HTTP status code of the response
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close the cURL session
curl_close($ch);

// Check if the request was successful
if ($http_status == 200) {
    // Parse the response and extract relevant data
    preg_match_all('/monitor_status\{(.*?)\} (\d+)/', $response, $matches, PREG_SET_ORDER);
    
    $data = [];
    // Loop through each match
    foreach ($matches as $match) {
        $labels = [];
        // Split the match into parts
        $parts = explode(',', $match[1]);
        // Loop through each part
        foreach ($parts as $part) {
            // Split the part into key and value
            list($key, $value) = explode('=', $part);
            // Trim and store the key-value pair
            $labels[trim($key)] = trim($value, '"');
        }
        // Add the parsed data to the data array
        $data[] = [
            'monitor_name' => $labels['monitor_name'],
            'monitor_type' => $labels['monitor_type'],
            'monitor_url' => $labels['monitor_url'],
            'monitor_hostname' => $labels['monitor_hostname'],
            'monitor_port' => $labels['monitor_port'],
            'status' => (int) $match[2]
        ];
    }
    
    // Set the content type of the response to JSON
    header('Content-Type: application/json');
    // Output the data in JSON format
    echo json_encode($data, JSON_PRETTY_PRINT);
} else {
    // Output an error message if the request was not successful
    echo "Failed to fetch data. HTTP Status Code: $http_status";
}
?>