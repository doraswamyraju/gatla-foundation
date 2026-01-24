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
        // Add start_date column if it doesn't exist
        $sql1 = "ALTER TABLE $table ADD COLUMN IF NOT EXISTS start_date DATE NULL AFTER availability";
        if ($conn->query($sql1) === TRUE) {
            $messages[] = "Added start_date to $table";
        } else {
            $messages[] = "Error adding start_date to $table: " . $conn->error;
        }

        // Add end_date column if it doesn't exist
        $sql2 = "ALTER TABLE $table ADD COLUMN IF NOT EXISTS end_date DATE NULL AFTER start_date";
        if ($conn->query($sql2) === TRUE) {
            $messages[] = "Added end_date to $table";
        } else {
            $messages[] = "Error adding end_date to $table: " . $conn->error;
        }

    } catch (Exception $e) {
        $messages[] = "Exception for $table: " . $e->getMessage();
    }
}

echo json_encode(["status" => "completed", "details" => $messages]);

$conn->close();
?>
