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
        // Helper function to check and add column
        $checkCol = $conn->query("SHOW COLUMNS FROM $table LIKE 'start_date'");
        if ($checkCol && $checkCol->num_rows == 0) {
            $sql1 = "ALTER TABLE $table ADD COLUMN start_date DATE NULL AFTER availability";
            if ($conn->query($sql1) === TRUE) {
                $messages[] = "Added start_date to $table";
            } else {
                $messages[] = "Error adding start_date to $table: " . $conn->error;
            }
        } else {
            $messages[] = "start_date already exists in $table";
        }

        $checkCol2 = $conn->query("SHOW COLUMNS FROM $table LIKE 'end_date'");
        if ($checkCol2 && $checkCol2->num_rows == 0) {
            $sql2 = "ALTER TABLE $table ADD COLUMN end_date DATE NULL AFTER start_date";
            if ($conn->query($sql2) === TRUE) {
                $messages[] = "Added end_date to $table";
            } else {
                $messages[] = "Error adding end_date to $table: " . $conn->error;
            }
        } else {
            $messages[] = "end_date already exists in $table";
        }

    } catch (Exception $e) {
        $messages[] = "Exception for $table: " . $e->getMessage();
    }
}

echo json_encode(["status" => "completed", "details" => $messages]);

$conn->close();
?>
