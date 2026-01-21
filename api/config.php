<?php
// api/config.php

// 1. Load credentials securely
// Check if a local environment file exists
if (file_exists(__DIR__ . '/db_env.php')) {
    include(__DIR__ . '/db_env.php');
} else {
    // FALLBACK / PRODUCTION CREDENTIALS
    // On cPanel, you can either create a db_env.php manually 
    // OR edit these lines directly on the server once.
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'rajugda1_gf'); 
    define('DB_PASSWORD', 'BOHPM6139n@');
    define('DB_NAME', 'rajugda1_gatla_foundation');
}

// 2. Connect to Database
function connectDB() {
    // Suppress connection errors from printing to screen
    $conn = @new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    
    if ($conn->connect_error) {
        // Return null or handle error gracefully
        // echo "Connection failed: " . $conn->connect_error; // Debugging only
        return null;
    }
    return $conn;
}

// Set header for JSON response generally used in APIs
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>