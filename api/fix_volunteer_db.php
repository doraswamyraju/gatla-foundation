<?php
// api/fix_volunteer_db.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();
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
    $log[] = "--- Checking $table ---";
    
    // 1. ADD MISSING COLUMNS
    $colsToAdd = [
        'start_date' => 'DATE NULL AFTER availability',
        'end_date' => 'DATE NULL AFTER start_date',
        'aadhaar_path' => 'VARCHAR(255) NULL AFTER end_date',
        'photo_path' => 'VARCHAR(255) NULL AFTER aadhaar_path',
        'club_preference' => 'VARCHAR(100) NULL AFTER interest_area', // Ensure this exists
        'availability' => 'VARCHAR(255) NULL AFTER club_preference'
    ];

    foreach ($colsToAdd as $col => $def) {
        $check = $conn->query("SHOW COLUMNS FROM $table LIKE '$col'");
        if ($check->num_rows == 0) {
            if ($conn->query("ALTER TABLE $table ADD COLUMN $col $def")) {
                $log[] = "Added column $col";
            } else {
                $log[] = "Failed to add $col: " . $conn->error;
            }
        }
    }

    // 2. DROP UNUSED COLUMNS
    $colsToDrop = ['status', 'preferred_time', 'document_path', 'interest'];
    foreach ($colsToDrop as $col) {
        $check = $conn->query("SHOW COLUMNS FROM $table LIKE '$col'");
        if ($check->num_rows > 0) {
            if ($conn->query("ALTER TABLE $table DROP COLUMN $col")) {
                $log[] = "Dropped column $col";
            } else {
                $log[] = "Failed to drop $col: " . $conn->error;
            }
        }
    }
}

echo json_encode(["status" => "done", "log" => $log]);
$conn->close();
?>
