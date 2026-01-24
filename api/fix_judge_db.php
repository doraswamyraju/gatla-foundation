<?php
// api/fix_judge_db.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();

$table = "music_judges";
$response = [];

// 1. Check if table exists
$checkTable = $conn->query("SHOW TABLES LIKE '$table'");
if ($checkTable->num_rows == 0) {
    // Table doesn't exist, create it from scratch
    $sql = "CREATE TABLE $table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        father_name VARCHAR(255),
        full_address TEXT,
        phone_no VARCHAR(20),
        email_id VARCHAR(100),
        aadhaar_no VARCHAR(20),
        qualification VARCHAR(255),
        occupation VARCHAR(255),
        experience_years VARCHAR(50),
        aadhaar_path VARCHAR(255),
        photo_path VARCHAR(255),
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    if ($conn->query($sql)) {
        echo json_encode(["status" => "success", "message" => "Table created successfully from scratch."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
    }
    $conn->close();
    exit;
}

// 2. Table exists, analyze columns
$columns = [];
$result = $conn->query("SHOW COLUMNS FROM $table");
while ($row = $result->fetch_assoc()) {
    $columns[] = $row['Field'];
}

$updates = [];

// Fix: address -> full_address
if (in_array('address', $columns) && !in_array('full_address', $columns)) {
    $updates[] = "CHANGE COLUMN address full_address TEXT";
} elseif (!in_array('full_address', $columns)) {
    $updates[] = "ADD COLUMN full_address TEXT";
}

// Fix: aadhar/aadhar_no -> aadhaar_no
if (!in_array('aadhaar_no', $columns)) {
    if (in_array('aadhar_no', $columns)) {
        $updates[] = "CHANGE COLUMN aadhar_no aadhaar_no VARCHAR(20)";
    } elseif (in_array('aadhar', $columns)) {
        $updates[] = "CHANGE COLUMN aadhar aadhaar_no VARCHAR(20)";
    } else {
        $updates[] = "ADD COLUMN aadhaar_no VARCHAR(20)";
    }
}

// Fix: Missing paths
if (!in_array('aadhaar_path', $columns)) $updates[] = "ADD COLUMN aadhaar_path VARCHAR(255)";
if (!in_array('photo_path', $columns)) $updates[] = "ADD COLUMN photo_path VARCHAR(255)";
if (!in_array('qualification', $columns)) $updates[] = "ADD COLUMN qualification VARCHAR(255)";
if (!in_array('occupation', $columns)) $updates[] = "ADD COLUMN occupation VARCHAR(255)";
if (!in_array('experience_years', $columns)) $updates[] = "ADD COLUMN experience_years VARCHAR(50)";


if (!empty($updates)) {
    $alterSql = "ALTER TABLE $table " . implode(", ", $updates);
    if ($conn->query($alterSql)) {
        $response[] = "Table schema updated successfully.";
    } else {
        $response[] = "Error updating schema: " . $conn->error;
    }
} else {
    $response[] = "Table schema is already up to date.";
}

echo json_encode(["status" => "success", "updates" => $response]);
$conn->close();
?>
