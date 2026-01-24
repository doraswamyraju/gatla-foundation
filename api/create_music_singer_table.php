<?php
// api/create_music_singer_table.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();

$sql = "CREATE TABLE IF NOT EXISTS music_singers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    disability_certificate_no VARCHAR(50),
    music_category VARCHAR(100),
    goal TEXT,
    aadhaar_path VARCHAR(255),
    disability_certificate_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Table music_singers created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
