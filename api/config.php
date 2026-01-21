<?php
// api/config.php

// 1. Load credentials securely
// Priority 1: Git-Ignored Credentials File (For Production which user manages manually)
if (file_exists(__DIR__ . '/db_credentials.php')) {
    require_once __DIR__ . '/db_credentials.php';
} 
// Priority 2: Old db_env.php (Legacy/Local)
else if (file_exists(__DIR__ . '/db_env.php')) {
    include(__DIR__ . '/db_env.php');
} 
else {
    // FALLBACK DEFAULTS
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', '');
    define('DB_NAME', 'gatla_foundation');
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