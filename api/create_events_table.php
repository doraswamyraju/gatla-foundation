<?php
// api/create_events_table.php
require_once 'config.php';
header("Content-Type: application/json");

$conn = connectDB();

$sql = "CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time VARCHAR(50),
    location VARCHAR(255),
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Table events created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
