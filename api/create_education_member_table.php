<?php
// api/create_education_member_table.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();

// Fields based on Cricket Member Form:
// full_name, father_name, address, phone_no, email_id, 
// aadhaar_no, disability_cert_no, category (B1/B2/B3)
// uploads: aadhaar, disability_cert, photo

$sql = "CREATE TABLE IF NOT EXISTS education_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    disability_cert_no VARCHAR(50),
    category VARCHAR(10), -- B1, B2, B3
    aadhaar_path VARCHAR(255),
    disability_cert_path VARCHAR(255),
    photo_path VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Table education_members created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
