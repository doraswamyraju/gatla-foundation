<?php
// api/reset_volunteer_tables.php
require_once 'config.php';
header("Content-Type: application/json");

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = connectDB();
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

$tables = [
    'general_volunteers',
    'education_volunteers',
    'cricket_volunteers',
    'music_volunteers',
    'business_volunteers',
    'awards_volunteers'
];

$log = [];

foreach ($tables as $table) {
    // 1. DROP TABLE
    $dropSql = "DROP TABLE IF EXISTS $table";
    if ($conn->query($dropSql)) {
        $log[] = "Dropped table: $table";
    } else {
        $log[] = "Error dropping $table: " . $conn->error;
    }

    // 2. CREATE TABLE (New Schema)
    // Removed: preferred_time, status (optional, using default), document_path
    // Added: start_date, end_date, aadhaar_path, photo_path
    $createSql = "CREATE TABLE $table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        father_name VARCHAR(255),
        address TEXT,
        phone_no VARCHAR(20),
        email_id VARCHAR(100),
        aadhaar_no VARCHAR(20),
        pan_card_no VARCHAR(20),
        qualification VARCHAR(255),
        occupation VARCHAR(255),
        interest_area VARCHAR(255),
        club_preference VARCHAR(100),
        availability VARCHAR(255),
        start_date DATE,
        end_date DATE,
        aadhaar_path VARCHAR(255),
        photo_path VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Pending',
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($createSql)) {
        $log[] = "Created table: $table";
    } else {
        $log[] = "Error creating $table: " . $conn->error;
    }
}

echo json_encode(["status" => "completed", "log" => $log]);
$conn->close();
?>
