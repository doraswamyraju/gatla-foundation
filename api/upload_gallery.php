<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = connectDB();

// AUTO-CREATE TABLE IF NOT EXISTS (Self-Healing)
$table_check = "CREATE TABLE IF NOT EXISTS gallery_images (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NULL,
    category VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$conn->query($table_check);

// Check file
if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(["error" => "No image file provided"]);
    exit();
}

// Get metadata
$title = isset($_POST['title']) ? $conn->real_escape_string($_POST['title']) : '';
$category = isset($_POST['category']) ? $conn->real_escape_string($_POST['category']) : 'General';

// Upload
$target_dir = __DIR__ . "/../uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$file_extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
$new_filename = uniqid() . "_gallery." . $file_extension;
$target_file = $target_dir . $new_filename;

if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    // Insert into DB
    $sql = "INSERT INTO gallery_images (title, category, image_path) VALUES ('$title', '$category', '$new_filename')";
    
    if ($conn->query($sql) === TRUE) {
        http_response_code(201);
        echo json_encode([
            "message" => "Image uploaded successfully",
            "image" => [
                "id" => $conn->insert_id,
                "title" => $title,
                "category" => $category,
                "image_path" => $new_filename
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $conn->error]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to upload file"]);
}

$conn->close();
?>
