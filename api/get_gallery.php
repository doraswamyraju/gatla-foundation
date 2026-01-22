<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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

$category = isset($_GET['category']) ? $conn->real_escape_string($_GET['category']) : null;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;

$sql = "SELECT * FROM gallery_images";
if ($category) {
    $sql .= " WHERE category = '$category'";
}
$sql .= " ORDER BY created_at DESC";

if ($limit) {
    $sql .= " LIMIT $limit";
}

$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $images[] = $row;
    }
}

echo json_encode($images);

$conn->close();
?>
