<?php
// api/create_business_member_table.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();

// Fields: full name, father name, full address, phone no, email id, aadhar no., pan no., 
// company name, company address, experience, occupation(employer/employee), upload aadhar & upload photo.

$sql = "CREATE TABLE IF NOT EXISTS business_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    pan_no VARCHAR(20),
    company_name VARCHAR(255),
    company_address TEXT,
    experience_years VARCHAR(50),
    occupation VARCHAR(255),
    aadhaar_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Table business_members created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
