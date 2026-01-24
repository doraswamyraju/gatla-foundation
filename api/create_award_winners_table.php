<?php
// api/create_award_winners_table.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();

$sql = "CREATE TABLE IF NOT EXISTS award_winners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    award_type VARCHAR(50) NOT NULL, -- Platinum, Gold, Silver, Bronze
    category VARCHAR(50) NOT NULL, -- Blind, Deaf & Dumb, etc.
    year INT NOT NULL,
    winner_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Table award_winners created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
