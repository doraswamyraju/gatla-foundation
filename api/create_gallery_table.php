<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = connectDB();

$sql = "CREATE TABLE IF NOT EXISTS gallery_images (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NULL,
    category VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Table gallery_images created successfully"]);
} else {
    echo json_encode(["error" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
