<?php
// api/create_awards_application_table.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();

// Fields: full name, father name, full address, phone no., email id, aadhar no, 
// disablity category (blind, dead & dumb, physical handicap, wheel chair), 
// occupation (education, buisness, sports, service, other), experience, 
// achievement, upload aadhar, upload diability certificate, upload press clips, upload biodata, upload passport photo.

$sql = "CREATE TABLE IF NOT EXISTS awards_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    full_address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    disability_category VARCHAR(100),
    occupation VARCHAR(100),
    experience VARCHAR(255),
    achievement TEXT,
    aadhaar_path VARCHAR(255),
    disability_certificate_path VARCHAR(255),
    press_clips_path VARCHAR(255),
    biodata_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Table awards_applications created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
