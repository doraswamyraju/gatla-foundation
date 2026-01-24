<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = connectDB();

$tables = [
    'general_volunteers',
    'education_volunteers',
    'cricket_volunteers',
    'music_volunteers',
    'business_volunteers',
    'awards_volunteers'
];

$messages = [];

foreach ($tables as $table) {
    try {
        // Drop status
        $conn->query("ALTER TABLE $table DROP COLUMN status");
        
        // Drop preferred_time
        $conn->query("ALTER TABLE $table DROP COLUMN preferred_time");
        
        // Drop document_path
        $conn->query("ALTER TABLE $table DROP COLUMN document_path");

        $messages[] = "Cleaned columns for $table";

    } catch (Exception $e) {
        // Ignore errors (e.g. column doesn't exist)
        $messages[] = "Note for $table: " . $e->getMessage();
    }
}

echo json_encode(["status" => "completed", "details" => $messages]);

$conn->close();
?>
