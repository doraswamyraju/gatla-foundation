<?php
// api/create_music_judge_table.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();

// Fields: full name, father name, full address, phone no, email id, aadhar no, 
// qualification, occupation, experience as a judge, upload aadhar & upload photo

$sql = "CREATE TABLE IF NOT EXISTS music_judges (
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

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Table music_judges created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
