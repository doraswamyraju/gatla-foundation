<?php
// api/create_blog_table.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'config.php';

$conn = connectDB();

if (!$conn) {
     die(json_encode(["status" => "error", "message" => "Connection failed"]));
}

// SQL to create table
$sql = "CREATE TABLE IF NOT EXISTS blog_posts (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    status VARCHAR(20) DEFAULT 'Draft',
    image_path VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Table 'blog_posts' created successfully or already exists."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
}

$conn->close();
?>
