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
        // Check/Add start_date
        $checkCol = $conn->query("SHOW COLUMNS FROM $table LIKE 'start_date'");
        if ($checkCol && $checkCol->num_rows == 0) {
            $conn->query("ALTER TABLE $table ADD COLUMN start_date DATE NULL AFTER availability");
            $messages[] = "Added start_date to $table";
        }

        // Check/Add end_date
        $checkCol2 = $conn->query("SHOW COLUMNS FROM $table LIKE 'end_date'");
        if ($checkCol2 && $checkCol2->num_rows == 0) {
            $conn->query("ALTER TABLE $table ADD COLUMN end_date DATE NULL AFTER start_date");
            $messages[] = "Added end_date to $table";
        }

        // Check/Add aadhaar_path
        $checkCol3 = $conn->query("SHOW COLUMNS FROM $table LIKE 'aadhaar_path'");
        if ($checkCol3 && $checkCol3->num_rows == 0) {
            $conn->query("ALTER TABLE $table ADD COLUMN aadhaar_path VARCHAR(255) NULL AFTER end_date");
            $messages[] = "Added aadhaar_path to $table";
        }

        // Check/Add photo_path
        $checkCol4 = $conn->query("SHOW COLUMNS FROM $table LIKE 'photo_path'");
        if ($checkCol4 && $checkCol4->num_rows == 0) {
            $conn->query("ALTER TABLE $table ADD COLUMN photo_path VARCHAR(255) NULL AFTER aadhaar_path");
            $messages[] = "Added photo_path to $table";
        }

    } catch (Exception $e) {
        $messages[] = "Exception for $table: " . $e->getMessage();
    }
}

echo json_encode(["status" => "completed", "details" => $messages]);

$conn->close();
?>
