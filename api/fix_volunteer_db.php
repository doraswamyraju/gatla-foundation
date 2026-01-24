<?php
// api/fix_volunteer_db.php
// BULLETPROOF VERSION

// 1. Output Buffering to catch unexpected PHP warnings/errors
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 2. Error Reporting adjustments
ini_set('display_errors', 0); // Don't print errors to easy output
error_reporting(E_ALL);

require_once 'config.php';

$response = [];

try {
    $conn = connectDB();
    if (!$conn) {
        throw new Exception("Database connection failed.");
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
        $log[] = "--- Checking $table ---";
        
        // Ensure table exists first
        $checkTable = $conn->query("SHOW TABLES LIKE '$table'");
        if ($checkTable->num_rows == 0) {
             $log[] = "Table $table does not exist. Skipping.";
             continue;
        }

        // 1. ADD MISSING COLUMNS
        $colsToAdd = [
            'interest_area' => 'VARCHAR(255) NULL AFTER occupation',
            'club_preference' => 'VARCHAR(100) NULL AFTER interest_area',
            'availability' => 'VARCHAR(255) NULL AFTER club_preference',
            'start_date' => 'DATE NULL AFTER availability',
            'end_date' => 'DATE NULL AFTER start_date',
            'aadhaar_path' => 'VARCHAR(255) NULL AFTER end_date',
            'photo_path' => 'VARCHAR(255) NULL AFTER aadhaar_path'
        ];

        foreach ($colsToAdd as $col => $def) {
            $check = $conn->query("SHOW COLUMNS FROM $table LIKE '$col'");
            if ($check && $check->num_rows == 0) {
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
            try {
                $check = $conn->query("SHOW COLUMNS FROM $table LIKE '$col'");
                if ($check && $check->num_rows > 0) {
                    if ($conn->query("ALTER TABLE $table DROP COLUMN $col")) {
                        $log[] = "Dropped column $col";
                    } else {
                        $log[] = "Failed to drop $col: " . $conn->error;
                    }
                }
            } catch (Exception $ex) {
                $log[] = "Error checking drop for $col: " . $ex->getMessage();
            }
        }
    }
    
    $response = ["status" => "done", "log" => $log];
    $conn->close();

} catch (Exception $e) {
    $response = ["status" => "error", "message" => $e->getMessage()];
}

// 3. Output JSON
ob_clean(); // Discard any standard PHP error garbage
echo json_encode($response);
exit;
?>
